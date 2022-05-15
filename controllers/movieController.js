const Movies = require("../models/movieModel");

exports.getMovies = async (req, res) => {
  try {
    const data = await Movies.find();
    if (!data) throw new Error(`Movies not found`);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const data = await Movies.create(req.body);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.findMovie = async (req, res) => {
  try {
    const data = await Movies.findById(req.params.id);
    if (!data) throw new Error(`Movie not found`);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const data = await Movies.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!data) throw new Error(`Movie not found`);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const response = await Movies.findByIdAndDelete(req.params.id);
    if (!response) throw new Error(`Movie not found`);
    res.status(200).json({
      status: "success",
      message: "Movie deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
