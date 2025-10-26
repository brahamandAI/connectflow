const { PrismaClient } = require('@prisma/client');

async function cleanupOrphanedPosts() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Cleaning up orphaned posts...');
    
    // Get all posts
    const allPosts = await prisma.post.findMany({
      select: {
        id: true,
        authorId: true,
        content: true
      }
    });
    
    console.log(`Found ${allPosts.length} posts`);
    
    // Get all user IDs
    const allUsers = await prisma.user.findMany({
      select: { id: true }
    });
    
    const userIds = new Set(allUsers.map(user => user.id));
    console.log(`Found ${userIds.size} users`);
    
    // Find orphaned posts
    const orphanedPosts = allPosts.filter(post => !userIds.has(post.authorId));
    console.log(`Found ${orphanedPosts.length} orphaned posts`);
    
    if (orphanedPosts.length > 0) {
      console.log('Orphaned posts:', orphanedPosts.map(p => ({ id: p.id, authorId: p.authorId, content: p.content.substring(0, 50) + '...' })));
      
      // Delete orphaned posts
      const deleteResult = await prisma.post.deleteMany({
        where: {
          id: {
            in: orphanedPosts.map(p => p.id)
          }
        }
      });
      
      console.log(`Deleted ${deleteResult.count} orphaned posts`);
    }
    
    console.log('Cleanup completed successfully');
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupOrphanedPosts();
