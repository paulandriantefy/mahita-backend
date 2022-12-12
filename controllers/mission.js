const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createMission = (req, res, next) => {
  prisma.mission
    .create({
      data: {
        titre: req.body.titre,
        domaine: {
          connectOrCreate: {
            where: { libelle: req.body.domaine },
            create: { libelle: req.body.domaine },
          },
        },
        description: req.body.description,
        tarif: req.body.tarif ? +req.body.tarif : 0,
        quartier: req.body.quartier,
        ville: req.body.ville,
        user: {
          connect: { id: +req.body.userId },
        },
      },
      include: { domaine: true, user: true },
    })
    .then((mission) => res.json(mission))
    .catch((error) => {
      next(error)
    })
}

exports.updateMission = (req, res, next) => {
  prisma.mission
    .update({
      where: { id: +req.params.id },
      data: {
        titre: req.body.titre,
        domaine: {
          connectOrCreate: {
            where: { libelle: req.body.domaine },
            create: { libelle: req.body.domaine },
          },
        },
        description: req.body.description,
        tarif: req.body.tarif ? +req.body.tarif : 0,
        quartier: req.body.quartier,
        ville: req.body.ville,
      },
      include: { domaine: true, outils: true, user: true },
    })
    .then((mission) => {
      res.json(mission)
    })
    .catch((error) => {
      next(new Error('Erreur lors de la mise à jour de la mission')) //Error('Mission introuvable'))
    })
}

exports.missionDetails = (req, res, next) => {
  prisma.mission
    .findUnique({
      where: { id: +req.params.id },
      include: {
        user: true,
        outils: true,
        domaine: true,
      },
    })
    .then((mission) => res.json(mission))
    .catch((error) => {
      next(
        new Error('Erreur lors de la récupération des détails de la mission')
      )
    })
}

function where(req) {
  let where = new Object()
  if (req.query.titre) {
    where.titre = { contains: req.query.titre }
  }
  if (req.query.domaine) {
    where.domaine = {
      libelle: { contains: req.query.domaine ? req.query.domaine : '%' },
    }
  }
  if (req.query.quartier) {
    where.quartier = { contains: req.query.quartier }
  }
  if (req.query.ville) {
    where.ville = { contains: req.query.ville }
  }
  if (req.query.user) {
    where.user = { nom: { contains: req.query.nom ? req.query.nom : '%' } }
  }
  return where
}

exports.getMissions = (req, res, next) => {
  prisma.mission
    .findMany({
      where: where(req),
      orderBy: { dateCreation: 'desc' },
      include: {
        domaine: true,
        outils: true,
        user: true,
      },
    })
    .then((missions) => {
      res.json(missions)
    })
    .catch((error) => {
      next(new Error('Erreur lors de la recherche'))
    })
}

exports.getMissionsByUser = (req, res, next) => {
  prisma.mission
    .findMany({
      where: { user: { id: +req.params.userId } },
      orderBy: { dateCreation: 'desc' },
      skip: +req.query.skip,
      take: 10,
      include: {
        domaine: true,
      },
    })
    .then((missions) => {
      res.json(missions)
    })
    .catch((error) => {
      next(
        new Error(
          "Erreur lors de la récupération des missions de l'utilisateur"
        )
      )
    })
}

exports.delete = (req, res, next) => {
  prisma.mission
    .findUnique({
      where: { id: +req.params.id },
    })
    .then((missionDeleted) => {
      if (missionDeleted.userId === +req.auth.userId) {
        prisma.mission
          .delete({
            where: { id: missionDeleted.id },
          })
          .then((mission) => {
            res.json(mission)
          })
          .catch((error) => {
            throw new Error('Erreur lors de la suppression')
          })
      } else {
        throw new Error('Vous ne pouvez pas supprimer cette mission')
      }
    })
    .catch((error) => {
      throw error //new Error('Mission introuvable')
    })
}
