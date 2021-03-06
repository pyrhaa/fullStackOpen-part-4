const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1
    });
    res.json(blogs);
  } catch (error) {
    res.status(404).end();
  }
});

blogsRouter.get('/:id', async (req, res) => {
  try {
    const idBlog = await Blog.findById(req.params.id);
    res.json(idBlog.toJSON());
  } catch (error) {
    res.status(404).end();
  }
});

blogsRouter.post('/', async (req, res) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  try {
    const body = req.body;
    const user = req.user;

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).end();
  }
});

blogsRouter.put('/:id', async (req, res) => {
  try {
    const body = req.body;

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    };
    const updateIdBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true
    });
    res.json(updateIdBlog.toJSON());
  } catch (error) {
    response.status(400).end();
  }
});

blogsRouter.delete('/:id', async (req, res) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id || !token || !decodedToken) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    const user = req.user;
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(id);
      res.status(204).end();
    } else {
      return res.status(401).json({
        error: 'Unauthorized to access blog, fail to remove'
      });
    }
  } catch (error) {
    res.status(400).end();
  }
});

module.exports = blogsRouter;
