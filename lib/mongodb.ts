import mongoose from 'mongoose'

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Use a module-level cache to avoid re-connecting on every hot reload in dev
const globalWithMongoose = global as typeof global & { mongooseCache?: MongooseCache }

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = { conn: null, promise: null }
}

const cache = globalWithMongoose.mongooseCache

export async function connectDB(): Promise<typeof mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI
  if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI in your .env.local file')
  }

  if (cache.conn) return cache.conn

  if (!cache.promise) {
    const opts: mongoose.ConnectOptions = { bufferCommands: false }
    cache.promise = mongoose.connect(MONGODB_URI, opts)
  }

  cache.conn = await cache.promise
  return cache.conn
}
