const listHelper = require('../utils/list_helper');

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '61f7bb955f0f371baa2ffd71',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe('total likes', () => {
  const emptyBlogList = [];

  test('when list is empty, equals the likes of that', () => {
    const result = listHelper.totalLikes(emptyBlogList);
    expect(result).toBe(0);
  });
});
