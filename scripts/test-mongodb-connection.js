const { MongoClient } = require('mongodb');

async function testMongoDBConnection() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('❌ MONGODB_URI environment variable is not set');
    console.log('\nPlease set MONGODB_URI in your environment variables:');
    console.log('For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority');
    console.log('For Local MongoDB: mongodb://localhost:27017/turbo-travels');
    return;
  }

  console.log('🔍 Testing MongoDB connection...');
  console.log('URI format check:', uri.includes('mongodb://') || uri.includes('mongodb+srv://') ? '✅ Valid format' : '❌ Invalid format');
  
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });

  try {
    console.log('🔄 Attempting to connect...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test database access
    const db = client.db();
    const collections = await db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
    // Test user collection
    const usersCollection = db.collection('users');
    const userCount = await usersCollection.countDocuments();
    console.log('👥 Users in database:', userCount);
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 This usually means:');
      console.log('1. Your MongoDB URI is malformed');
      console.log('2. The cluster name is incorrect');
      console.log('3. Network connectivity issues');
    } else if (error.message.includes('Authentication failed')) {
      console.log('\n💡 Authentication failed. Check your username and password.');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Connection refused. Make sure MongoDB is running.');
    }
  } finally {
    await client.close();
  }
}

// Run the test
testMongoDBConnection(); 