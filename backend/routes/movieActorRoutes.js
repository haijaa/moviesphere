const express = require("express");
const router = express.Router();
const movieActorController = require("../controllers/movieActorController");

router.post(
  "/movie/:movieId/movieActor",
  movieActorController.linkActorToMovie
);

module.exports = router;
