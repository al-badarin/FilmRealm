const mongoose = require('mongoose');

const castSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      max: 120,
      min: 1,
    },
    born: {
      type: String,
      required: true,
    },
    nameInMovie: {
      type: String,
      required: true,
    },
    castImage: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return /^https?:\/\//.test(value);
        },
        message: (props) => `${props.value} is invalid url for the castImage!`,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set createdAt to current date
    },
    // movies: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Movie'
    // }]
  },
  { timestamps: true }
);

const Cast = mongoose.model('Cast', castSchema);

module.exports = Cast;
