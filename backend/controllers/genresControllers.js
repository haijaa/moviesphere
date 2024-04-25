const connectionMySQL = require("../connectionMySQL");

exports.getGenres = async (req, res) => {
  let sql = "SELECT * FROM genres";
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
};

exports.getGenre = async (req, res) => {
  const { id, name } = req.params;
  let sql = "SELECT * FROM genres WHERE genreId = ? OR genreName = ?";
  try {
    await connectionMySQL.query(sql, [id, name], (error, results, fields) => {
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
};

exports.createGenre = async (req, res) => {
  const { name } = req.body;

  if (!directorName || directorName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      error: "Unsuccessful: The genre name is missing",
    });
  }

  let sql = "INSERT INTO genres (genreName) VALUES (?)";
  let params = [name];

  try {
    await connectionMySQL.query(sql, params);
    return res.status(201).json({
      success: true,
      error: "",
      message: "Successfully added a Genre!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
exports.updateGenre = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  let sql =
    "UPDATE directors SET directorName = ? WHERE genreId = ? OR genreName = ?";
  let params = [id, name];
  if (!name || name.trim().length < 1) {
    return res.status(400).json({
      success: false,
      error: "Unsuccessful: The genre name is missing",
    });
  }
  try {
    await connectionMySQL.query(sql, params, (error, results, fields) => {
      if (error) {
        throw error;
      }
      return res.status(200).json({
        success: true,
        error: "",
        message: "Genre updated successfully!",
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteGenre = async (req, res) => {
  const { id, name } = req.body;

  let sql = "DELETE FROM genres WHERE genreId = ? OR genreName = ?";

  if (!id || !name) {
    return res.status(400).json({
      success: false,
      error: "Unsuccessful: You have not specified a genre id or genre name",
    });
  }

  try {
    await connectionMySQL.query(sql, [id, name], (error, results, fields) => {
      if (error) {
        if (error) throw error;
      }
      return res.status(201).json({
        success: true,
        error: "",
        message: "Successfully removed genre!",
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
