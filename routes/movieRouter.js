const express = require("express");
const movieController = require("./../controllers/movieController");
const auth = require("./../utils/authentication");

const router = express.Router();

router
  .route("/")
  .get(movieController.getMovies)
  .post(movieController.createMovie);

router
  .route("/:id")
  .get(movieController.findMovie)
  .put(auth.checkAuth, movieController.updateMovie)
  .delete(auth.checkAuth, movieController.deleteMovie);

module.exports = router;
