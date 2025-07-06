import { MongoClient, Db, Document, WithId, Filter, UpdateFilter, OptionalUnlessRequiredId, FindOptions } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = process.env.MONGODB_DB || 'turbo-travels';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface CachedConnection {
  client: MongoClient | null;
  db: Db | null;
  promise: Promise<{ client: MongoClient; db: Db }> | null;
}

declare global {
  var mongo: CachedConnection;
}

let cached: CachedConnection = global.mongo || { client: null, db: null, promise: null };

if (!global.mongo) {
  global.mongo = { client: null, db: null, promise: null };
  cached = global.mongo;
}

export async function connectToDatabase(): Promise<Db> {
  if (cached.db) {
    return cached.db;
  }

  if (!cached.promise) {
    const opts = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }

  try {
    const { client, db } = await cached.promise;
    cached.client = client;
    cached.db = db;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.db;
}

export async function closeDatabase(): Promise<void> {
  if (cached.client) {
    await cached.client.close();
    cached.client = null;
    cached.db = null;
    cached.promise = null;
  }
}

// Helper function to get collection
export async function getCollection(collectionName: string) {
  const db = await connectToDatabase();
  return db.collection(collectionName);
}

// Helper function to find one document
export async function findOne<T extends Document>(
  collectionName: string, 
  filter: Filter<Document>
): Promise<WithId<T> | null> {
  const collection = await getCollection(collectionName);
  return collection.findOne<T>(filter) as Promise<WithId<T> | null>;
}

// Helper function to find multiple documents
export async function find<T extends Document>(
  collectionName: string, 
  filter: Filter<Document> = {},
  options?: FindOptions<Document>
): Promise<WithId<T>[]> {
  const collection = await getCollection(collectionName);
  return collection.find<T>(filter, options).toArray() as Promise<WithId<T>[]>;
}

// Helper function to insert one document
export async function insertOne<T extends Document>(
  collectionName: string, 
  document: OptionalUnlessRequiredId<T>
): Promise<{ insertedId: string }> {
  const collection = await getCollection(collectionName);
  const result = await collection.insertOne(document);
  return { insertedId: result.insertedId.toString() };
}

// Helper function to update one document
export async function updateOne(
  collectionName: string, 
  filter: Filter<Document>,
  update: UpdateFilter<Document> | Partial<Document>
): Promise<{ modifiedCount: number }> {
  const collection = await getCollection(collectionName);
  const result = await collection.updateOne(filter, update);
  return { modifiedCount: result.modifiedCount };
}

// Helper function to delete one document
export async function deleteOne(
  collectionName: string, 
  filter: Filter<Document>
): Promise<{ deletedCount: number }> {
  const collection = await getCollection(collectionName);
  const result = await collection.deleteOne(filter);
  return { deletedCount: result.deletedCount || 0 };
}