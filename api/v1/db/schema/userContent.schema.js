const mongoose = require('mongoose');

const model = 'userContent';

const userContentModelSchema = new mongoose.Schema({
  user: {
    username: String,
    birthyear: String
  },
  content: {
    description: String,
    title: String
  },
  updatedAt: { type: Date, default: Date.now }
});

const userContentModel = async connection => {
  const modelConnection = await connection.model(model, userContentModelSchema);
  return modelConnection;
};

module.exports = {
  userContentModel
};
