const Movie = require('../models/Movie');
const Cast = require('../models/Cast');

exports.getAll = () => Movie.find();

// Get the latest movies sorted by creation date
exports.getLatest = (limit) => {
  return Movie.find()
    .sort({ createdAt: 1 }) // Sort by createdAt field in descending order
    .limit(limit); // Limit the number of results
};

// Filter search results based on title, genre, and year
exports.search = (title, genre, year) => {
  let query = {};

  if (title) {
    query.title = new RegExp(title, 'i'); // Case-insensitive search
  }

  if (genre) {
    query.genre = genre.toLowerCase();
  }

  if (year) {
    query.year = year;
  }

  return Movie.find(query);
};

exports.getOne = (movieId) => Movie.findById(movieId).populate('casts');

// Create a new movie document
exports.create = (movieData) => Movie.create(movieData);

// Update movie data by ID
exports.edit = (movieId, movieData) =>
  Movie.findByIdAndUpdate(movieId, movieData);

// Attach a cast to a movie
exports.attach = async (movieId, castId) => {
  const movie = await this.getOne(movieId);

  // Check if the cast exists
  const cast = await Cast.findById(castId);
  if (!cast) {
    throw new Error('Cast member not found');
  }

  // Check if the cast is already added to the movie
  if (movie.casts.includes(castId)) {
    throw new Error('Cast member is already added to this movie');
  }

  // Add the cast ID to the movie's cast array
  movie.casts.push(castId);

  // Save the updated movie document
  await movie.save();

  return movie;
};

// Delete a movie by ID
exports.delete = (movieId) => Movie.findByIdAndDelete(movieId);
