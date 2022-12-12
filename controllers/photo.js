const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const fs = require('fs')

function createPhoto(req) {
  console.log(req.files)
  let photoData = []
  const files = req.files
  files.forEach((file) => {
    photoData.push({
      url: `${req.protocol}://${req.get('host')}/images/${file.filename}`,
      userId: +req.body.userId,
      profil: false,
    })
  })
  return photoData
}

exports.addPhoto = (req, res, next) => {
  prisma.photo
    .createMany({
      data: createPhoto(req),
    })
    .then((result) => {
      prisma.photo
        .findMany({
          where: { userId: +req.body.userId },
          orderBy: { id: 'desc' },
          skip: 0,
          take: result.count,
        })
        .then((photos) => {
          res.json(photos)
        })
    })
    .catch((error) =>
      next(Error("Erreur lors de l'ajout de l'image rééssayer"))
    )
}

exports.delete = (req, res, next) => {
  try {
    prisma.photo
      .findUnique({
        where: { id: +req.params.id },
      })
      .then((photo) => {
        if (!photo) {
          throw new Error('Photo introuvable')
        }
        if (photo.userId !== req.auth.userId) {
          throw new Error("Vous n'avez pas le droit de suppimer la photo")
        }
        prisma.photo
          .delete({ where: { id: photo.id } })
          .then((photoDeleted) => {
            const filename = photoDeleted.url.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
              res.json(photoDeleted)
            })
          })
          .catch((error) => {
            throw new Error('Erreur de suppression rééssayer')
          })
      })
  } catch (error) {
    next(error)
  }
}

exports.modifyPhotoProfil = (req, res, next) => {
  prisma.photo
    .create({
      data: {
        url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId: +req.body.userId,
        profil: true,
      },
    })
    .then((photo) => {
      prisma.user
        .update({
          where: { id: +req.body.userId },
          data: { urlPhoto: photo.url },
        })
        .then((user) => res.json(user))
        .catch((error) =>
          next(error /* new Error('Utilisateur introuvable') */)
        )
    })
    .catch((error) => {
      next(error)
    })
}
