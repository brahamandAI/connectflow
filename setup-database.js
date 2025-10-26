const { execSync } = require('child_process');

console.log('Setting up database for LinkedIn-style feed...');

try {
  console.log('1. Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('2. Pushing schema to database...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  
  console.log('3. Seeding with sample data...');
  execSync('curl -X POST http://localhost:3001/api/seed', { stdio: 'inherit' });
  
  console.log('✅ Database setup complete!');
} catch (error) {
  console.error('❌ Database setup failed:', error.message);
  console.log('\nManual steps:');
  console.log('1. Run: npx prisma generate');
  console.log('2. Run: npx prisma db push');
  console.log('3. Start your dev server: npm run dev');
  console.log('4. Visit: http://localhost:3001/api/seed (POST request)');
}
