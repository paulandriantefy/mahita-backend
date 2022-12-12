const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function modelService(req) {
  return {
    libelle: req.body.libelle,
    domaine: {
      connectOrCreate: {
        where: { libelle: req.body.domaine },
        create: { libelle: req.body.domaine },
      },
    },
    description: req.body.description,
    user: {
      connect: { id: +req.body.userId },
    },
  }
}

exports.addService = async (req, res, next) => {
  try {
    service = await prisma.service.create({
      data: modelService(req),
      include: { user: true, domaine: true },
    })
    if (service) {
      res.json(service)
    } else {
      throw Error("Erreur lors de l'eregistrement")
    }
  } catch (error) {
    next(error)
  }
}

exports.deleteService = (req, res, next) => {
  prisma.service
    .delete({
      where: {
        id: +req.params.id,
      },
    })
    .then((service) => res.json(service))
    .catch((error) => {
      next(Error('Erreur lors de la supression'))
    })
}

exports.serviceDetails = (req, res, next) => {
  prisma.service
    .findUnique({
      where: { id: +req.params.id },
      include: {
        domaine: true,
      },
    })
    .then((service) => {
      res.status(200).json(service)
    })
    .catch((error) => {
      next(new Error('Erreur lors de la récupérations des détails du service'))
    })
}

exports.updateService = (req, res, next) => {
  prisma.service
    .update({
      where: { id: +req.params.id },
      data: {
        libelle: req.body.libelle,
        domaine: {
          connectOrCreate: {
            where: { libelle: req.body.domaine },
            create: { libelle: req.body.domaine },
          },
        },
        description: req.body.description,
      },
      include: { domaine: true },
    })
    .then((service) => res.json(service))
    .catch(() => {
      next(new Error('Erreur lors de la mise à jour du service'))
    })
}

function where(req) {
  let where = new Object()
  if (req.query.titre) {
    where.libelle = { contains: req.query.titre }
  }
  if (req.query.domaine) {
    where.domaine = { libelle: { contains: req.query.domaine } }
  }
  return where
}

exports.getServices = (req, res, next) => {
  prisma.service
    .findMany({
      where: where(req),
      include: { domaine: true, user: true },
    })
    .then((services) => {
      res.json(services)
    })
    .catch((error) => {
      next(new Error('Erreur lors de la récupératoin des services'))
    })
}

exports.getServiesByUser = (req, res, next) => {
  prisma.service
    .findMany({
      where: {
        user: { id: +req.params.userId },
      },
      include: { domaine: true },
    })
    .then((services) => {
      res.json(services)
    })
    .catch((error) => {
      next(
        new Error(
          "Erreur lors de la récupératoin des services de l'utilisateur"
        )
      )
    })
}
