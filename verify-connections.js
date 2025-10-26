/**
 * Verification Script: Connection System Health Check
 * 
 * This script verifies that the connection system is working correctly
 * by checking that all connection records use valid unified User IDs.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verifyConnections() {
  console.log('🔍 Starting connection system verification...\n');

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

    console.log(`📊 Found ${allConnections.length} total connections\n`);

    let validCount = 0;
    let invalidCount = 0;
    const issues = [];

    for (const connection of allConnections) {
      // Verify userId exists in User table
      const user = await prisma.user.findUnique({
        where: { id: connection.userId },
        select: { id: true, fullName: true, email: true }
      });

      // Verify connectedUserId exists in User table
      const connectedUser = await prisma.user.findUnique({
        where: { id: connection.connectedUserId },
        select: { id: true, fullName: true, email: true }
      });

      if (!user) {
        invalidCount++;
        issues.push({
          connectionId: connection.id,
          issue: `Invalid userId: ${connection.userId} - not found in User table`,
          status: connection.status
        });
      }

      if (!connectedUser) {
        invalidCount++;
        issues.push({
          connectionId: connection.id,
          issue: `Invalid connectedUserId: ${connection.connectedUserId} - not found in User table`,
          status: connection.status
        });
      }

      if (user && connectedUser) {
        validCount++;
        if (connection.status === 'pending') {
          console.log(`✅ Connection ${connection.id} (${connection.status})`);
          console.log(`   From: ${user.fullName} (${user.email})`);
          console.log(`   To: ${connectedUser.fullName} (${connectedUser.email})\n`);
        }
      }
    }

    console.log('='.repeat(70));
    console.log('📊 Verification Summary:');
    console.log('='.repeat(70));
    console.log(`Total connections: ${allConnections.length}`);
    console.log(`✅ Valid connections: ${validCount}`);
    console.log(`❌ Invalid connections: ${invalidCount}`);

    // Show connection status breakdown
    const statusCounts = allConnections.reduce((acc, conn) => {
      acc[conn.status] = (acc[conn.status] || 0) + 1;
      return acc;
    }, {});

    console.log('\nConnection Status Breakdown:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`);
    });

    if (issues.length > 0) {
      console.log('\n' + '='.repeat(70));
      console.log('⚠️  Issues Found:');
      console.log('='.repeat(70));
      issues.forEach((issue, index) => {
        console.log(`\n${index + 1}. Connection ID: ${issue.connectionId}`);
        console.log(`   Issue: ${issue.issue}`);
        console.log(`   Status: ${issue.status}`);
      });
    } else {
      console.log('\n✨ All connections are valid and using unified User IDs!');
    }

    // Check for pending connections that should be visible
    console.log('\n' + '='.repeat(70));
    console.log('📥 Pending Connection Requests:');
    console.log('='.repeat(70));

    const pendingConnections = allConnections.filter(c => c.status === 'pending');
    
    if (pendingConnections.length === 0) {
      console.log('No pending connection requests found.');
    } else {
      for (const conn of pendingConnections) {
        const sender = await prisma.user.findUnique({
          where: { id: conn.userId },
          select: { fullName: true, email: true, role: true }
        });
        const receiver = await prisma.user.findUnique({
          where: { id: conn.connectedUserId },
          select: { fullName: true, email: true, role: true }
        });

        console.log(`\n📬 Request ID: ${conn.id}`);
        console.log(`   From: ${sender?.fullName} (${sender?.email}) [${sender?.role}]`);
        console.log(`   To: ${receiver?.fullName} (${receiver?.email}) [${receiver?.role}]`);
        console.log(`   Created: ${conn.createdAt.toLocaleString()}`);
      }
    }

    console.log('\n' + '='.repeat(70));

    if (invalidCount === 0) {
      console.log('\n✅ All connection system checks passed!');
      console.log('Connection requests should now be visible to receivers.');
    } else {
      console.log('\n⚠️  Some issues were found. Please review the details above.');
    }

  } catch (error) {
    console.error('\n❌ Error during verification:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the verification
verifyConnections()
  .then(() => {
    console.log('\n🎉 Verification completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Verification failed:', error);
    process.exit(1);
  });

