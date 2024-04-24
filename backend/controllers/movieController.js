const connectionMySQL = require("../connectionMySQL");

exports.getMovies = async (req, res) => {
  let sql = "SELECT * FROM movies";
  try {
    await connectionMySQL.query(sql, (error, results, fields) => {
      if (error) {
        if (error) throw error;
      }
      res.json(results);
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.createMovie = async (req, res) => {
  const {
    movieTitle,
    movieYear,
    movieOriginalLanguage,
    movieGenreId,
    movieDirectorId,
  } = req.body;
  let sql =
    "INSERT INTO movies ( movieTitle, movieYear, movieOriginalLanguage, movieGenreId, movieDirectorId) VALUES (?,?,?,?,?)";
  let params = [
    movieTitle,
    movieYear,
    movieOriginalLanguage,
    movieGenreId,
    movieDirectorId,
  ];
  if (!movieTitle) {
    return res.status(400).json({
      success: false,
      error: "Please enter a movietitle to add a movie",
    });
  }
  try {
    await connectionMySQL.query(sql, params, (error) => {
      if (error) {
        if (error) throw error;
      }
      return res.status(201).json({
        success: true,
        error: "",
        message: `You have added ${movieTitle}`,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.changeMovie = async (req, res) => {
  const {
    movieTitle,
    movieYear,
    movieOriginalLanguage,
    movieGenreId,
    movieDirectorId,
    movieId,
  } = req.body;
  let sql =
    "UPDATE movies SET movieTitle = ?, movieYear = ?, movieOriginalLanguage = ?, movieGenreId = ?, movieDirectorId = ? WHERE movieId = ?";

  let params = [
    movieTitle,
    movieYear,
    movieOriginalLanguage,
    movieGenreId,
    movieDirectorId,
    movieId,
  ];
  if (!movieId) {
    return res.status(400).json({
      success: false,
      error: "You have to enter a movie ID",
    });
  }
  try {
    await connectionMySQL.query(sql, params, (error) => {
      if (error) {
        if (error) throw error;
      }
      return res.status(201).json({
        success: true,
        error: "",
        message: `You have now changed ${movieTitle}`,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  const { movieId } = req.body;
  let sql = "DELETE FROM movies WHERE movieId = ?";
  if (!movieId) {
    return res.status(400).json({
      success: false,
      error: "Need to enter a movie ID to delete",
    });
  }
  try {
    await connectionMySQL.query(sql, [movieId], (error) => {
      if (error) {
        if (error) throw error;
      }
      return res.status(201).json({
        success: true,
        error: "",
        message: `Movie ${movieId} is now deleted`,
      });
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* exports.getMovies = async (req, res) => {
  let sql = `
      SELECT movieTitle, movieYear, genreName, directorName
      FROM movies
      INNER JOIN directors ON movies.movieDirectorId = directors.directorId
      INNER JOIN genres ON movies.movieGenreId = genres.genreId
    `;
  try {
    await connectionMySQL.query(sql, (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.json(results);
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}; */