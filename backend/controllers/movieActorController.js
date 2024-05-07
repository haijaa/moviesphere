const connectionMySQL = require("../connectionMySQL");

exports.linkActorToMovie = async (req, res) => {
  const { movieActorMovieId, movieActorActorId } = req.body;
  let sql =
    "INSERT INTO movieActors (movieActorMovieId, movieActorActorId) VALUES (?, ?)";
  let params = [movieActorMovieId, movieActorActorId];
  if (!movieActorActorId) {
    return res.status(400).json({
      success: false,
      error: "You need to enter a actor.",
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
        message: "You have connected actor to a movie.",
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
