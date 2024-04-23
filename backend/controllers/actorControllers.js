const connectionMySQL = require('../connectionMySQL')

exports.getActors = async (req, res) => {
  let sql = 'SELECT * FROM actors'
  try {
    await connectionMySQL.query(sql, (error, results) => {
      if (error) {
        if (error) throw error
      }
      res.json(results)
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.createActor = async (req, res) => {
  const { actorName, actorBorn } = req.body

  let sql = 'INSERT INTO actors (actorName, actorBorn) VALUES (?, ?)'
  let params = [actorName, actorBorn]

  if (!actorName || actorName.trim().length < 1) {
    return res.status(400).json({
      success: false,
      error: 'You have not written a name for the actor',
    })
  }
  try {
    await connectionMySQL.query(sql, params, (error) => {
      if (error) {
        if (error) throw error
      }
      return res.status(201).json({
        succsess: true,
        error: '',
        message: `You have added ${actorName}!`,
      })
    })
  } catch (error) {
    return res.status(500).json({
      sucsess: false,
      error: error.message,
    })
  }
}

exports.updateActor = async (req, res) => {
  const { actorName, actorBorn, actorId } = req.body
  let sql = 'UPDATE actors SET actorName = ?, actorBorn = ? WHERE actorId = ?'
  let params = [actorName, actorBorn, actorId]
  if (!actorId) {
    return res.status(400).json({
      success: false,
      error: 'You have not written an ID for the actor you want to update',
    })
  }
  if (!actorName) {
    return res.status(400).json({
      success: false,
      error: 'You have not written a name for the actor you want to update!',
    })
  }
  try {
    await connectionMySQL.query(sql, params, (error) => {
      if (error) {
        if (error) throw error
      }
      return res.status(201).json({
        success: true,
        error: '',
      })
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

exports.deleteActor = async (req, res) => {
  const { actorId } = req.body
  let sql = 'DELETE FROM actors WHERE actorId = ?'

  if (!actorId) {
    return res.status(400).json({
      success: false,
      error: 'You have not written an ID for the actor you will delete',
    })
  }
  try {
    await connectionMySQL.query(sql, [actorId], (error) => {
      if (error) {
        if (error) throw error
      }
      return res.status(201).json({
        success: true,
        error: '',
        message: `${actorId} is now deleted!`,
      })
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}
