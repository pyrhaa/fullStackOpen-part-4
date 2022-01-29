const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');

const url = config.MONGODB_URI;

logger.info('connecting to', url);

mongoose
  .connect(url)
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.error('error connecting to MongoDB', error.message));

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);
