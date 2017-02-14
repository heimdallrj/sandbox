module.exports = {
  db: {
    mongoUrl: process.env.MONGO_URL
  },
  passport: {
    secret: process.env.PASSPORT_SECRET
  },
  authy: {
    apiKey: process.env.AUTHY_API_KEY
  }
};
