// import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

// check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environmental variable");
}

// check the MongoDB DB
if (!MONGODB_DB) {
  throw new Error("Define the MONGODB_DB environmental variable");
}

// creating connection object
const connection = {};

const dbConnect = async () => {
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  const db = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
};
export default dbConnect;

// const connectDB = async () => {
//   if (mongoose.connections[0].readyState) {
//     console.log("connected");
//     return;
//   }
//   await mongoose.connect(MONGODB_URI, {
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//     useNewUrlParser: true,
//   });
// };

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// const dbConnect = async () => {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       bufferCommands: false,
//       bufferMaxEntries: 0,
//       useFindAndModify: true,
//       useCreateIndex: true,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// };

// export default dbConnect;

// let cachedClient = null;
// let cachedDb = null;

// export async function connectToDatabase() {
//   // check the cached.
//   if (cachedClient && cachedDb) {
//     // load from cache
//     return {
//       client: cachedClient,
//       db: cachedDb,
//     };
//   }

//   // set the connection options
//   const opts = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };

//   // Connect to cluster
//   let client = new MongoClient(MONGODB_URI, opts);
//   let db;
//   try {
//     await client.connect();
//     db = client.db(MONGODB_DB);
//   } catch (error) {
//     throw new Error("Database connection failed");
//   }

//   // set cache
//   cachedClient = client;
//   cachedDb = db;

//   return {
//     client: cachedClient,
//     db: cachedDb,
//   };
// }
