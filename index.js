const http = require('http');
const express = require('express');
const app = express();
const Blog = require('./models/blog');
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
