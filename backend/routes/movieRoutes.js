const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/", movieController.getMovies);
router.get("/movie/:movieId", movieController.getMovie);
router.post("/", movieController.createMovie);
router.put("/", movieController.changeMovie);
router.delete("/", movieController.deleteMovie);

module.exports = router;
