const connectionMySQL = require('../connectionMySQL');

exports.getGenres = async (req, res) => {
  let sql = 'SELECT * FROM genres';
  try {
    await connectionMySQL.query(sql, (error, results, fields) => {
      if (error) {
        console.log('Error 409:', error);
        return res.status(409).json({
          success: false,
          error: 'Something went wrong!',
        });
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
  const { genreId } = req.params;
  let sql = 'SELECT * FROM genres WHERE genreId = ?';
  try {
    await connectionMySQL.query(sql, [id], (error, results, fields) => {
      if (error) {
        console.log('Error 409:', error);
        return res.status(409).json({
          success: false,
          error: `${genreId} doesn't exists in database`,
        });
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
  const { genreName } = req.body;
  if (!genreName || genreName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      error: 'Unsuccessful: The genre name is missing',
    });
  }
  let sql = 'INSERT INTO genres (genreName) VALUES (?)';
  let params = [genreName];
  try {
    await connectionMySQL.query(sql, params, (error, results, fields) => {
      if (error) {
        console.log('Error 409:', error);
        return res.status(409).json({
          success: false,
          error: `${genreName} doesn't exists in database`,
        });
      }
      return res.status(201).json({
        success: true,
        error: '',
        message: `Successfully added ${genreName}`,
      });
    });
  } catch (error) {
    console.error('Error executing SQL query:', error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
exports.updateGenre = async (req, res) => {
  const { genreId } = req.params;
  const { genreName } = req.body;
  let sql = 'UPDATE genres SET genreName = ? WHERE genreId = ?';
  let params = [genreId, genreName];
  if (!genreName || genreName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      error: 'Unsuccessful: The genre name is missing',
    });
  }
  try {
    await connectionMySQL.query(sql, params, (error, results, fields) => {
      if (error) {
        console.log('Error 409:', error);
        return res.status(409).json({
          success: false,
          error: `${genreName} doesn't exists in database`,
        });
      }
      return res.status(200).json({
        success: true,
        error: '',
        message: `${genreName} updated successfully!`,
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
  const { genreName } = req.body;

  let sql = 'DELETE FROM genres WHERE genreName = ?';

  if (!genreName) {
    return res.status(400).json({
      success: false,
      error: 'Unsuccessful: You have not specified the genre name!',
    });
  }

  try {
    await connectionMySQL.query(sql, [genreName], (error, results, fields) => {
      if (error) {
        console.log('Error 409:', error);
        return res.status(409).json({
          success: false,
          error: `${genreName} doesn't exists in database!`,
        });
      }
      return res.status(201).json({
        success: true,
        error: '',
        message: `Successfully removed ${genreName}!`,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
