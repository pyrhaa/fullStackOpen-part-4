const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const initialBlogs = helper.initialBlogs;

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('identifier property of the blogs is named id', async () => {
  const res = await api.get('/api/blogs');
  expect(res.body[0].id).toBeDefined();
  expect(res.body[0]._id).toBe(undefined);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Blog test',
    author: 'Tutti Fruitti',
    url: 'https://reactpatterns.com/',
    likes: 9
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

  const titles = blogsAtEnd.map((r) => r.title);
  expect(titles).toContain('Blog test');
});

test('blog without author is not added', async () => {
  const newBlog = {
    title: 'No Author',
    url: 'https://dontclick.com',
    likes: 1
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
