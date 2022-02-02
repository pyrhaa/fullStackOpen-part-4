const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 'No Blog, the is empty';
  } else {
    const mostLikedBlog = blogs.reduce((prev, current) =>
      prev.likes > current.likes ? prev : current
    );

    const formatReturn = {
      title: mostLikedBlog.title,
      author: mostLikedBlog.author,
      likes: mostLikedBlog.likes
    };

    return formatReturn;
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
