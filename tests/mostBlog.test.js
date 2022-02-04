const listHelper = require('../utils/list_helper');

describe('most blog', () => {
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

  const most = {
    author: 'Edsger W. Dijkstra',
    blogs: 1
  };

  test('when the list contains one blog, most blog equals', () => {
    const result = listHelper.mostBlog(listWithOneBlog);
    expect(result).toEqual(most);
  });
});

describe('most blog', () => {
  const emptyList = [];

  const most = {};

  test('when the list is empty, most blog equals', () => {
    const result = listHelper.mostBlog(emptyList);
    expect(result).toEqual(most);
  });
});
