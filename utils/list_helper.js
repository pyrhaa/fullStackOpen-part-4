const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 'No Blog, this is empty';
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

/////////////////// Using Lodash library /////////////////////

const mostBlog = (blogs) => {
  if (_.size(blogs) === 0) {
    return 'No Blog, this is empty';
  } else {
    const order = _.groupBy(blogs, 'author');
    const howMany = _.reduce(
      order,
      (prev, current) => {
        return prev > current ? prev : current;
      },
      {}
    );

    const formatReturn = {
      author: howMany[0].author,
      blogs: howMany.length
    };

    return formatReturn;
  }
};

const mostLikes = (blogs) => {
  if (_.size(blogs) === 0) {
    return 'No Blog, this is empty';
  } else {
    const order = _.groupBy(blogs, 'author');
    const allLikes = _.mapValues(order, totalLikes);
    let objList = [];
    _.forEach(allLikes, (value, key) => {
      const newObj = { author: key, likes: value };
      objList.push(newObj);
    });

    const mostLikedAuthor = _.reduce(objList, (prev, current) =>
      prev.likes > current.likes ? prev : current
    );

    return mostLikedAuthor;
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes
};
