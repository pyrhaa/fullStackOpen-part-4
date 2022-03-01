const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const initialBlogs = helper.initialBlogs;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

////////////////////// Blog test part //////////////////////

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test('the first note is about React', async () => {
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].title).toBe('React patterns');
  });
});

describe('viewing a specific blog', () => {
  test('identifier property of the blogs is named id', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body[0].id).toBeDefined();
    expect(res.body[0]._id).toBe(undefined);
  });
});

describe('addition of a new blog', () => {
  let token = null;
  beforeAll(async () => {
    await User.deleteMany({});
    const user = await new User({
      username: 'User1',
      passwordHash: await bcrypt.hash('user1', 10)
    });

    const log = { username: 'User1', id: user.id };
    token = jwt.sign(log, process.env.SECRET);
    return token;
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
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).toContain('Blog test');
  });

  test('blog without likes will default value 0', async () => {
    const newBlog = {
      author: 'Kawkaw',
      title: 'No Author',
      url: 'https://dontclick.com'
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

    const likes = blogsAtEnd.map((r) => r.likes);
    expect(likes[likes.length - 1]).toBe(0);
  });

  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'Kawkaw',
      likes: 1
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test('blog without author is not added', async () => {
    const newBlog = {
      title: 'No Author',
      url: 'https://dontclick.com',
      likes: 1
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

describe('delete a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.titles);
  });
});

describe('update a blog', () => {
  test('a blog likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 9 })
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0]).toHaveProperty('likes', 9);
  });

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updateBlog = {
      title: 'Postman try',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 1
    };

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updateBlog).expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
    expect(blogsAtEnd[0]).toEqual(expect.objectContaining(updateBlog));
  });
});

afterAll(() => {
  mongoose.connection.close();
});
