const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function updateAvgNoteUser(id, note) {
  prisma.user
    .update({
      where: { id: id },
      data: { avgNote: note.valeur },
    })
    .then(() => {
      return note
    })
    .catch((error) => {
      next(new Error("Erreur d'évaluation de la note moyenne"))
    })
}

exports.giveNote = (req, res, next) => {
  prisma.note
    .create({
      data: {
        valeur: +req.body.valeur,
        avis: req.body.avis,
        prestataire: {
          connect: { id: +req.body.prestataireId },
        },
        user: {
          connect: { id: +req.body.userId },
        },
      },
    })
    .then((note) => {
      updateAvgNoteUser(note.prestataireId, note)
      res.json(note)
    })
    .catch((error) => {
      next(error /* new Error('Erreur dans les données entrées') */)
    })
}

exports.avgUserNote = (req, res, next) => {
  prisma.note
    .aggregate({
      _avg: { valeur: true },
      where: { prestataire: { id: +req.params.id } },
    })
    .then((avg) => res.json(avg))
    .catch((error) => {
      next(new Error('Erreur serveur'))
    })
}

exports.getNotesByUser = (req, res, next) => {
  prisma.note
    .findMany({
      where: { prestataire: { id: +req.params.id } },
      include: { user: true },
      skip: +req.query.skip,
      take: 10,
    })
    .then((notes) => {
      return res.json(notes)
    })
    .catch((error) => {
      next(
        new Error("Erreur lors de la récupération des avis de l'utilisateur")
      )
    })
}

exports.getNotes = (req, res, next) => {
  prisma.note
    .groupBy({
      by: ['prestataireId'],
      where: {
        prestataire: {
          valide: true,
          prestataire: true,
        },
      },
      _avg: {
        valeur: true,
      },
      orderBy: {
        _avg: {
          valeur: 'desc',
        },
      },
    })
    .then((notes) => {
      prestataires = new Array()
      notes.forEach((note) => {
        prisma.user
          .findUnique({ where: { id: note.prestataireId } })
          .then((user) => {
            prestataires.push({
              prestataire: user,
              note: note._avg.valeur,
            })
          })
          .catch((error) => {
            throw error
          })
      })
      res.json(prestataires)
    })
    .catch((error) => {
      next(new Error('Erreur serveur'))
    })
}
