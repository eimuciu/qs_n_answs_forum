require('dotenv').config();
const { MongoClient } = require('mongodb');

const dbClient = new MongoClient(process.env.MONGO_DB);
const PORT = process.env.PORT || 3001;

module.exports = { PORT, dbClient };
