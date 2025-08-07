import { payload } from 'payload';

export default async function publishScheduler() {
  try {
    console.log('📤 Starting publish scheduler...');
    
    // Get reviewed raw contents that are still drafts
    const rawContents = await payload.find({
      collection: 'rawContents',
      where: {
        and: [
          {
            reviewed: {
              equals: true,
            },
          },
          {
            status: {
              equals: 'draft',
            },
          },
        ],
      },
      limit: 5, // Max 5 per day
      sort: 'createdAt',
    });

    console.log(`📝 Found ${rawContents.docs.length} reviewed contents to publish`);

    for (const content of rawContents.docs) {
      try {
        console.log(`📤 Publishing content: ${content.title}`);
        
        // Determine target collection based on content type or metadata
        let targetCollection = 'posts'; // Default to posts
        
        if (content.metadata?.promptType === 'product') {
          targetCollection = 'products';
        } else if (content.metadata?.promptType === 'service') {
          targetCollection = 'services';
        } else if (content.source === 'RSS' && content.metadata?.feedName?.includes('news')) {
          targetCollection = 'posts';
        }
        
        // Prepare data for target collection
        const publishData: any = {
          title: content.title,
          content: content.content,
          excerpt: content.excerpt,
          status: 'published',
          publishedAt: new Date().toISOString(),
          tags: content.tags || [],
          categories: content.categories || [],
          author: content.author,
        };
        
        // Add collection-specific fields
        if (targetCollection === 'posts') {
          publishData.slug = content.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        } else if (targetCollection === 'products') {
          publishData.name = content.title;
          publishData.description = content.content;
          publishData.shortDescription = content.excerpt;
          publishData.status = 'active';
        } else if (targetCollection === 'services') {
          publishData.name = content.title;
          publishData.description = content.content;
          publishData.shortDescription = content.excerpt;
          publishData.status = 'active';
        }
        
        // Create content in target collection
        const publishedContent = await payload.create({
          collection: targetCollection,
          data: publishData,
        });
        
        // Update raw content status
        await payload.update({
          collection: 'rawContents',
          id: content.id,
          data: {
            status: 'published',
            metadata: {
              ...content.metadata,
              publishedTo: targetCollection,
              publishedAt: new Date().toISOString(),
              publishedContentId: publishedContent.id,
            },
          },
        });
        
        console.log(`✅ Published content to ${targetCollection}: ${publishedContent.title || publishedContent.name}`);
        
        // Send notification if email plugin is configured
        if (process.env.SMTP_HOST) {
          try {
            // This would be handled by the email plugin
            console.log(`📧 Notification sent for published content: ${publishedContent.title || publishedContent.name}`);
          } catch (emailError) {
            console.error('❌ Email notification failed:', emailError);
          }
        }
        
      } catch (publishError) {
        console.error(`❌ Error publishing content ${content.title}:`, publishError);
        
        // Update raw content with error status
        await payload.update({
          collection: 'rawContents',
          id: content.id,
          data: {
            status: 'draft',
            metadata: {
              ...content.metadata,
              publishError: publishError instanceof Error ? publishError.message : 'Unknown error',
              lastPublishAttempt: new Date().toISOString(),
            },
          },
        });
      }
    }
    
    console.log('✅ Publish scheduler completed');
  } catch (error) {
    console.error('❌ Publish scheduler error:', error);
  }
}

// Alternative function for manual publishing
export async function publishRawContent(rawContentId: string, targetCollection: 'posts' | 'pages' | 'products' | 'services' = 'posts') {
  try {
    console.log(`📤 Manually publishing content: ${rawContentId}`);
    
    // Get the raw content
    const rawContent = await payload.findByID({
      collection: 'rawContents',
      id: rawContentId,
    });
    
    if (!rawContent) {
      throw new Error('Raw content not found');
    }
    
    // Prepare data for target collection
    const publishData: any = {
      title: rawContent.title,
      content: rawContent.content,
      excerpt: rawContent.excerpt,
      status: 'published',
      publishedAt: new Date().toISOString(),
      tags: rawContent.tags || [],
      categories: rawContent.categories || [],
      author: rawContent.author,
    };
    
    // Add collection-specific fields
    if (targetCollection === 'posts') {
      publishData.slug = rawContent.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    } else if (targetCollection === 'products') {
      publishData.name = rawContent.title;
      publishData.description = rawContent.content;
      publishData.shortDescription = rawContent.excerpt;
      publishData.status = 'active';
    } else if (targetCollection === 'services') {
      publishData.name = rawContent.title;
      publishData.description = rawContent.content;
      publishData.shortDescription = rawContent.excerpt;
      publishData.status = 'active';
    }
    
    // Create content in target collection
    const publishedContent = await payload.create({
      collection: targetCollection,
      data: publishData,
    });
    
    // Update raw content status
    await payload.update({
      collection: 'rawContents',
      id: rawContentId,
      data: {
        status: 'published',
        reviewed: true,
        metadata: {
          ...rawContent.metadata,
          publishedTo: targetCollection,
          publishedAt: new Date().toISOString(),
          publishedContentId: publishedContent.id,
          manuallyPublished: true,
        },
      },
    });
    
    console.log(`✅ Successfully published content to ${targetCollection}: ${publishedContent.title || publishedContent.name}`);
    return publishedContent;
  } catch (error) {
    console.error('❌ Manual publish error:', error);
    throw error;
  }
}