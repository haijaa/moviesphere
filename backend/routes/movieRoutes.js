const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/movies", movieController.getMovies);
router.get("/movie/:movieId", movieController.getMovie);
router.post("/movies", movieController.createMovie);
router.put("/movies", movieController.changeMovie);
router.delete("/movies", movieController.deleteMovie);

module.exports = router;
