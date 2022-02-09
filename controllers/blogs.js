const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (blog) {
        res.json(blog.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post('/', (req, res, next) => {
  const body = req.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  });

  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => next(error));
});

blogsRouter.put('/:id', (req, res, next) => {
  const body = req.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then((result) => res.json(result.toJSON()))
    .catch((error) => next(error));
});

module.exports = blogsRouter;
