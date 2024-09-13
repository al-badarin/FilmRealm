const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 2,
      match: /^[a-zA-Z0-9\s:,'-]+$/, // Allows letters, numbers, spaces, colons, commas, apostrophes, and hyphens
    },
    genre: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 5,
      match: /^[a-zA-Z0-9\s:,'-]+$/, // Allows letters, numbers, spaces, colons, commas, apostrophes, and hyphens
    },
    director: {
      type: String,
      required: true,
      minLength: 5,
      match: /^[a-zA-Z0-9\s:,'-]+$/, // Allows letters, numbers, spaces, colons, commas, apostrophes, and hyphens
    },
    year: {
      type: Number,
      required: true,
      min: 1900,
      max: 2024,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    imageUrl: {
      type: String,
      required: true,
      match: /^https?:\/\//,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set createdAt to current date
    },
    casts: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Cast',
      },
    ],
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
