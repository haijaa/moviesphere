const express = require("express");
const router = express.Router();
const genresController = require("../controllers/genresController");

// Define the base route for directors
router.get("/genres", genresController.getGenres);
router.get("/genre/:id", genresController.getGenre);
router.post("/genre", genresController.createGenre);
router.put("/genre/:id", genresController.updateGenre);
router.delete("/genre/:id", genresController.deleteGenre);

module.exports = router;
