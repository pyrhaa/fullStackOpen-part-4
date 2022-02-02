const e = require('cors');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const fav = blogs.find((el) => el.likes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
