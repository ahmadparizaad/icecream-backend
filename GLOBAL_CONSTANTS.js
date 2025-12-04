const GLOBAL = {
  MONGO_URI: process.env.MONGO_URI ||
    "mongodb+srv://icecream:icecream@cluster0.jqs3b5t.mongodb.net/?retryWrites=true&w=majority",
  JWT_SECRET: process.env.JWT_SECRET || "84k303j37dk930494kd\\8343-+384-308hgki",
  Asset_ID: process.env.Asset_ID || "6401e2b67326c6d71048eecc",
};

module.exports = GLOBAL;
