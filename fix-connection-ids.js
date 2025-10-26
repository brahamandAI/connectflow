/**
 * Database Migration Script: Fix Connection IDs
 * 
 * This script migrates any existing connection records that use legacy 
 * JobSeeker or Recruiter IDs to use unified User table IDs instead.
 * 
 * This fixes the issue where connection requests don't show up on the 
 * receiver's side due to ID mismatches between different user tables.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUnifiedUserId(legacyId) {
  // Try to find in User table first
  const user = await prisma.user.findUnique({
    where: { id: legacyId },
    select: { id: true, email: true }
  });

  if (user) {
    return legacyId; // Already a unified ID
  }

  // Check JobSeeker table
  const jobSeeker = await prisma.jobSeeker.findUnique({
    where: { id: legacyId },
    select: { 
      id: true, 
      email: true, 
      fullName: true,
      currentJobTitle: true,
      city: true,
      state: true,
      country: true
    }
  });

  if (jobSeeker) {
    // Find or create unified user
    let unifiedUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: jobSeeker.email.toLowerCase().trim(),
          mode: 'insensitive'
        }
      },
      select: { id: true }
    });

    if (!unifiedUser) {
      console.log(`Creating unified user for JobSeeker: ${jobSeeker.email}`);
      unifiedUser = await prisma.user.create({
        data: {
          email: jobSeeker.email.toLowerCase().trim(),
          fullName: jobSeeker.fullName,
          role: 'jobseeker',
          headline: jobSeeker.currentJobTitle,
          location: [jobSeeker.city, jobSeeker.state, jobSeeker.country].filter(Boolean).join(', ') || null
        }
      });
    }

    return unifiedUser.id;
  }

  // Check Recruiter table
  const recruiter = await prisma.recruiter.findUnique({
    where: { id: legacyId },
    select: { 
      id: true, 
      email: true, 
      fullName: true,
      position: true,
      companyName: true,
      city: true,
      state: true,
      country: true
    }
  });

  if (recruiter) {
    // Find or create unified user
    let unifiedUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: recruiter.email.toLowerCase().trim(),
          mode: 'insensitive'
        }
      },
      select: { id: true }
    });

    if (!unifiedUser) {
      console.log(`Creating unified user for Recruiter: ${recruiter.email}`);
      unifiedUser = await prisma.user.create({
        data: {
          email: recruiter.email.toLowerCase().trim(),
          fullName: recruiter.fullName,
          role: 'recruiter',
          headline: recruiter.position,
          companyName: recruiter.companyName,
          location: [recruiter.city, recruiter.state, recruiter.country].filter(Boolean).join(', ') || null
        }
      });
    }

    return unifiedUser.id;
  }

  return null; // User not found
}

async function fixConnectionIds() {
  console.log('🔍 Starting connection ID migration...\n');

  try {
    // Get all connections
    const allConnections = await prisma.connection.findMany({
      select: {
        id: true,
        userId: true,
        connectedUserId: true,
        status: true,
        createdAt: true
      }
    });

    console.log(`Found ${allConnections.length} total connections\n`);

    let fixedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const connection of allConnections) {
      try {
        console.log(`\n📋 Processing connection ${connection.id}...`);
        console.log(`   Original userId: ${connection.userId}`);
        console.log(`   Original connectedUserId: ${connection.connectedUserId}`);

        // Get unified IDs
        const unifiedUserId = await getUnifiedUserId(connection.userId);
        const unifiedConnectedUserId = await getUnifiedUserId(connection.connectedUserId);

        if (!unifiedUserId) {
          console.log(`   ❌ Could not find user for userId: ${connection.userId}`);
          errorCount++;
          continue;
        }

        if (!unifiedConnectedUserId) {
          console.log(`   ❌ Could not find user for connectedUserId: ${connection.connectedUserId}`);
          errorCount++;
          continue;
        }

        // Check if IDs need updating
        if (unifiedUserId === connection.userId && unifiedConnectedUserId === connection.connectedUserId) {
          console.log(`   ✓ Already using unified IDs - skipping`);
          skippedCount++;
          continue;
        }

        // Update the connection
        await prisma.connection.update({
          where: { id: connection.id },
          data: {
            userId: unifiedUserId,
            connectedUserId: unifiedConnectedUserId
          }
        });

        console.log(`   ✅ Updated to unified IDs:`);
        console.log(`      userId: ${unifiedUserId}`);
        console.log(`      connectedUserId: ${unifiedConnectedUserId}`);
        fixedCount++;
      } catch (error) {
        console.error(`   ❌ Error processing connection ${connection.id}:`, error.message);
        errorCount++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 Migration Summary:');
    console.log('='.repeat(60));
    console.log(`Total connections: ${allConnections.length}`);
    console.log(`✅ Fixed: ${fixedCount}`);
    console.log(`⏭️  Skipped (already correct): ${skippedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log('='.repeat(60));

    if (errorCount === 0) {
      console.log('\n✨ Migration completed successfully!');
    } else {
      console.log('\n⚠️  Migration completed with some errors. Please review the logs above.');
    }
  } catch (error) {
    console.error('\n❌ Fatal error during migration:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
fixConnectionIds()
  .then(() => {
    console.log('\n🎉 Script execution completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script execution failed:', error);
    process.exit(1);
  });

