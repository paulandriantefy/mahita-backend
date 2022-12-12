const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.get('authorization')
    const decodedToken = jwt.verify(token, 'MAHITA:28/08_SECRET_TOKEN')
    const userId = decodedToken.userId
    req.auth = { userId }
    if (req.body.userId && +req.body.userId !== userId) {
      throw 'Utilisateur invalide'
    }
    next()
  } catch (error) {
    next(
      error
      //Error("Erreur d'authentification")
    )
  }
}
