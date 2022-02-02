const e = require('cors');

// const dummy = (blogs) => {
//   return 1;
// };

// const totalLikes = (blogs) => {
//   const reducer = (sum, blog) => sum + blog.likes;

//   return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
// };

const test = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
];

const favoriteBlog = (blogs) => {
  const mostLikedBlog = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  );

  const formatReturn = {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  };

  return formatReturn;
};

console.log(favoriteBlog(test));

// module.exports = {
//   dummy,
//   totalLikes,
//   favoriteBlog
// };
