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
  const { id } = req.params;
  let sql = "SELECT * FROM genres WHERE genreId = ?";
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

// exports.createGenre = async (req, res) => {
//   const { name } = req.body;
//   if (!name || name.trim().length < 1) {
//     return res.status(400).json({
//       success: false,
//       error: "Unsuccessful: The genre name is missing",
//     });
//   }
//   let sql = "INSERT INTO genres (genreName) VALUES (?)";
//   let params = [name];
//   try {
//     // Check if the genre already exists
//     const existingGenre = await connectionMySQL.query(
//       "SELECT * FROM genres WHERE genreName = ?",
//       [name],
//       (error, results, fields) => {
//         if (error) {
//           // if (error) throw error;
//           console.log("Error:", error);
//         }
//         console.log("The solution is: ", results[0].solution);
//         return res.status(409).json({
//           success: false,
//           error: "Genre already exists",
//         });
//       }
//     );
//     // console.log(existingGenre._connection.state);
//     // if (existingGenre._connection.state === "disconnected") {
//     //   return res.status(409).json({
//     //     success: false,
//     //     error: "Genre already exists",
//     //   });
//     // }
//     await connectionMySQL.query(sql, params, (error, results, fields) => {
//       if (error) {
//         // if (error) throw error;
//         console.log("Error2:", error);
//       }
//       return res.status(201).json({
//         success: true,
//         error: "",
//         message: "Successfully added a genre!",
//       });
//     });
//   } catch (error) {
//     console.error("Error executing SQL query:", error); // Log the error for debugging
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };
exports.updateGenre = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  let sql = "UPDATE directors SET directorName = ? WHERE genreId = ?";
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
  const { id } = req.body;

  let sql = "DELETE FROM genres WHERE genreId = ?";

  if (!id) {
    return res.status(400).json({
      success: false,
      error: "Unsuccessful: You have not specified a genre id or genre name",
    });
  }

  try {
    await connectionMySQL.query(sql, [id], (error, results, fields) => {
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
