const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/government';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');
    
    // Test if database exists
    const dbs = await client.db().admin().listDatabases();
    console.log('Available databases:');
    dbs.databases.forEach(db => console.log(`- ${db.name}`));
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\nMake sure MongoDB is running locally. You can start it with:');
      console.log('1. Windows: Open Services and start "MongoDB" service');
      console.log('   Or run: net start MongoDB');
      console.log('2. macOS/Linux: brew services start mongodb-community');
    }
  } finally {
    await client.close();
  }
}

testConnection();
