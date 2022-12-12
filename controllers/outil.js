const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function connectOutilToUser(req, res, outil) {
  prisma.user
    .update({
      where: { id: +req.body.userId },
      data: { outils: { connect: { id: outil.id } } },
    })
    .then(() => res.json(outil))
    .catch(() => {
      throw Error('Utilisateur introuvable ou erreur serveur')
    })
}

function createOutilForUser(req, res) {
  prisma.outil
    .create({
      data: {
        nom: req.body.nom,
        users: { connect: { id: +req.body.userId } },
      },
    })
    .then((outil) => res.json(outil))
    .catch(() => {
      throw Error('Utilisateur introuvable ou erreur serveur')
    })
}

function connectOutilToMission(req, res, outil) {
  prisma.mission
    .update({
      where: { id: +req.body.missionId },
      data: { outils: { connect: { id: outil.id } } },
    })
    .then((outil) => res.json(outil))
    .catch((error) => {
      throw Error('Mission introuvable ou erreur serveur')
    })
}

function createOutilForMission(req, res) {
  prisma.outil
    .create({
      data: {
        nom: req.body.nom,
        missions: { connect: { id: +req.body.missionId } },
      },
    })
    .then((outil) => res.json(outil))
    .catch(() => {
      throw Error('Mission introuvable ou erreur serveur')
    })
}

exports.addOutilUser = (req, res, next) => {
  prisma.outil
    .findFirst({
      where: { nom: req.body.nom },
    })
    .then((outil) => {
      outil ? connectOutilToUser(req, res, outil) : createOutilForUser(req, res)
    })
    .catch((error) => {
      next(error)
    })
}

exports.addOutilMission = (req, res, next) => {
  prisma.outil
    .findFirst({
      where: { nom: req.body.nom },
    })
    .then((outil) => {
      outil
        ? connectOutilToMission(req, res, outil)
        : createOutilForMission(req, res)
    })
    .catch((error) => {
      next(error)
    })
}

exports.disconnectOutil = (req, res, next) => {
  try {
    if (req.body.userId) {
      prisma.outil
        .update({
          where: { id: +req.body.id },
          data: { users: { disconnect: [{ id: +req.body.userId }] } },
        })
        .then((outil) => res.json(outil))
        .catch((error) => {
          throw error /* 'Outil introuvable' */
        })
    } else if (req.body.missionId) {
      prisma.outil
        .update({
          where: { id: +req.body.id },
          data: { missions: { disconnect: [{ id: +req.body.missionId }] } },
        })
        .then((outil) => res.json(outil))
        .catch((error) => {
          throw error /* Error('Outil introuvable') */
        })
    } else {
      throw Error('Erreur de données')
    }
  } catch (error) {
    next(error)
  }
}

exports.getOutilByMission = (req, res, next) => {
  prisma.mission
    .findUnique({
      where: { id: +req.params.idMission },
    })
    .outils()
    .then((outils) => {
      console.log(outils)
      res.json(outils)
    })
    .catch((error) => next(error /* Error('Erreur récupération de données') */))
}

exports.getOutilByName = (req, res, next) => {
  prisma.outil
    .findFirst({ where: { nom: req.params.nom } })
    .then((outil) => {
      res.json(outil)
    })
    .catch((error) => {
      next(Error('Erreur récupération données'))
    })
}
