const mongoose = require("mongoose");

const connectWithRetry = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn("MONGO_URI is not set. Skipping DB connection.");
      return;
    }
    if (mongoose.connection.readyState === 1) {
      // already connected
      return mongoose;
    }
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connected to database");
    return mongoose;
  } catch (err) {
    console.error("Error connecting to DB:", err.message || err);
    throw err;
  }
};

// Connect on initial import; serverless platforms will cache the module between invocations.
connectWithRetry();

module.exports = { connectWithRetry, mongoose };
