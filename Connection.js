const mongoose = require("mongoose");

/**
 * connectWithRetry - serverless-friendly DB connection that caches connection status.
 * - Returns Promise that resolves with mongoose when connected.
 * - In production (or in serverful mode), if MONGO_URI isn't set the function throws.
 * - Adds serverSelectionTimeoutMS so we fail fast when DB is unreachable.
 */
const connectWithRetry = async () => {
  // If the connection is already established, return it
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    return mongoose;
  }

  // If there is an existing pending connection promise, return it
  if (global._mongoPromise) {
    return global._mongoPromise;
  }

  // If there's no MONGO_URI set, warn in dev and throw in production
  if (!process.env.MONGO_URI) {
    const warnMsg = "MONGO_URI is not set";
    console.warn(warnMsg);
    if (process.env.NODE_ENV === "production" || process.env.PORT) {
      throw new Error(warnMsg);
    }
    // In dev, return resolved promise so local development can proceed without DB
    return Promise.resolve(mongoose);
  }

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // fail fast on unreachable db
    connectTimeoutMS: 5000,
  };

  // store the promise so subsequent invocations reuse it
  global._mongoPromise = mongoose.connect(process.env.MONGO_URI, options).then(() => {
    console.log("Connected to database");
    global._mongo = mongoose;
    return mongoose;
  }).catch((err) => {
    console.error("Error connecting to DB:", err.message || err);
    // clear _mongoPromise so a future attempt can try again
    global._mongoPromise = null;
    throw err;
  });

  return global._mongoPromise;
};

// Attempt initial connect but don't crash the module import. Handlers will await connectWithRetry as needed.
connectWithRetry().catch(e => {
  // Logging here helps diagnose cold-start issues, but we don't crash the process on import.
  console.warn('Initial database connect failed (this may be OK in dev):', e.message || e);
});

module.exports = { connectWithRetry, mongoose };
