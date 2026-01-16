// /lib/mongodb/index.ts
import MongoDBClient from './mongodb';

// Create a singleton instance
const dbClient = new MongoDBClient();
export default dbClient;