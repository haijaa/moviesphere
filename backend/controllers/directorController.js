const connectionMySQL = require('../connectionMySQL');

exports.getDirectors = async (req, res) => {
  let sql = 'SELECT * FROM directors';
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

exports.getDirector = async (req, res) => {
  const { id } = req.params;
  let sql = 'SELECT * FROM directors WHERE directorId = ?';
  try {
    await connectionMySQL.query(sql, [id], (error, results, fields) => {
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

exports.createDirector = async (req, res) => {
  const { directorName, directorImg } = req.body;

  if (!directorName || directorName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      error: 'The Director name is missing',
    });
  }

  let sql = 'INSERT INTO directors (directorName, directorImg) VALUES (?, ?)';
  let params = [directorName, directorImg];

  try {
    await connectionMySQL.query(sql, params);
    return res.status(201).json({
      success: true,
      error: '',
      message: 'You have added a Director',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
exports.updateDirector = async (req, res) => {
  const { id } = req.params;
  const { directorName } = req.body;
  let sql = 'UPDATE directors SET directorName = ? WHERE directorId = ?';
  let params = [directorName, id];
  if (!directorName || directorName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      error: 'The Director name is missing',
    });
  }
  try {
    await connectionMySQL.query(sql, params, (error, results, fields) => {
      if (error) {
        throw error;
      }
      return res.status(200).json({
        success: true,
        error: '',
        message: 'Director updated successfully',
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteDirector = async (req, res) => {
  const { directorId } = req.body;

  let sql = 'DELETE FROM directors WHERE directorId = ?';

  if (!directorId) {
    return res.status(400).json({
      success: false,
      error: 'You have not specified a directorId',
    });
  }

  try {
    await connectionMySQL.query(sql, [directorId], (error, results, fields) => {
      if (error) {
        if (error) throw error;
      }
      return res.status(201).json({
        success: true,
        error: '',
        message: 'The director has been removed',
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
