const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "name is mandatory for a movie"],
    unique: [true, "the name should be unique"],
  },
  rating: {
    type: Number,
    max: 5,
    min: 1,
  },
  cast: [String],
  Genre: {
    type: String,
  },
  releaseDate: Date,
});

const Movies = mongoose.model("Movies", movieSchema);

module.exports = Movies;
