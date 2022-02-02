const listHelper = require('../utils/list_helper');

describe('favorite blog', () => {
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

  const favorite = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5
  };

  test('when list has only one blog, equals the favorite blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(favorite);
  });
});
