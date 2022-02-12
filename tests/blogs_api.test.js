const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
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

// test('a valid blog can be added', async () => {
//   const newBlog = {
//     title: 'Blog test',
//     author: 'Tutti Fruitti',
//     url: 'https://reactpatterns.com/',
//     likes: 9
//   };

//   await api
//     .get('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/);

//   const res = await api.get('/api/blogs');
// });

afterAll(() => {
  mongoose.connection.close();
});
