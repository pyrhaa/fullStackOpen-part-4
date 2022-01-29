const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
