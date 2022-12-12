const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()

function setUser(req) {
  user = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    description: req.body.description,
    tel: req.body.tel,
    email: req.body.email,
    adresse: req.body.adresse,
    quartier: req.body.quartier,
    ville: req.body.ville,
  }
  req.body.prestataire ? (user.prestataire = true) : (user.prestataire = false)
  req.body.societe ? (user.societe = true) : (user.societe = false)
  return user
}

exports.signup = async (req, res, next) => {
  try {
    const existUser = await prisma.user.findFirst({
      where: { tel: req.body.tel },
    })
    if (existUser) {
      throw Error('Un compte avec le téléphone existe déjà')
    }
    const hash = await bcrypt.hash(req.body.password, 10)
    user = setUser(req)
    user.password = hash
    const userCreated = await prisma.user.create({ data: user })
    if (userCreated) {
      return res.json({
        userId: userCreated.id,
        token: jwt.sign({ userId: user.id }, 'MAHITA:28/08_SECRET_TOKEN', {
          expiresIn: '24h',
        }),
      })
    }
    throw Error("Erreur lors de l'enregistrement")
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            tel: {
              equals: req.body.identifiant,
            },
          },
          {
            email: {
              equals: req.body.identifiant,
            },
          },
        ],
      },
    })
    if (!user) {
      throw Error('Utilisateur introuvable')
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      throw Error('Utilisateur introuvable')
    }
    res.json({
      userId: user.id,
      token: jwt.sign({ userId: user.id }, 'MAHITA:28/08_SECRET_TOKEN', {
        expiresIn: '24h',
      }),
    })
  } catch (error) {
    next(error)
  }
}

exports.userDetails = async (req, res, next) => {
  const userId = +req.params.id
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        services: {
          include: { domaine: true },
        },
        outils: true,
        missions: {
          include: { domaine: true, outils: true, user: true },
        },
        photos: true,
        notesRecues: { include: { user: true } },
      },
    })
    if (user) {
      return res.json(user)
    }
    throw new Error('Utilisateur introuvable')
  } catch (error) {
    next(error)
  }
}

exports.updateUser = (req, res, next) => {
  const userId = +req.params.id
  prisma.user
    .findUnique({
      where: {
        id: userId,
      },
    })
    .then((user) => {
      if (user && user.id === req.auth.userId) {
        prisma.user
          .update({
            where: {
              id: userId,
            },
            data: {
              nom: req.body.nom,
              prenom: req.body.prenom,
              description: req.body.description,
              tel: req.body.tel,
              email: req.body.email,
              adresse: req.body.adresse,
              quartier: req.body.quartier,
              ville: req.body.ville,
              prestataire: req.body.prestataire,
              societe: req.body.societe === 'true' ? true : false,
            },
          })
          .then((userUpdated) => res.json(userUpdated))
          .catch((error) => {
            next(new Error('Erreur lors la mise à jour'))
          })
      } else {
        throw new Error('Impossible de faire la mise à jour')
      }
    })
    .catch((error) => {
      next(new Error('Erreur serveur'))
    })
}

exports.modifyPassword = (req, res, next) => {
  const userId = +req.params.id
  prisma.user
    .findFirst({
      where: {
        id: userId,
      },
    })
    .then((user) => {
      if (user) {
        bcrypt
          .compare(req.body.oldPassword, user.password)
          .then((valid) => {
            if (valid) {
              bcrypt
                .hash(req.body.newpassword, 10)
                .then((hash) => {
                  prisma.user
                    .update({
                      where: {
                        id: user.id,
                      },
                      data: {
                        password: hash,
                      },
                    })
                    .then((userUpdated) => res.json(userUpdated))
                    .catch((error) => {
                      next(new Error('Erreur lors de la mise à jour'))
                    })
                })
                .catch((error) => {
                  next(new Error('Erreur cryptage mot de passe'))
                })
            } else {
              next(new Error('Ancien mot de passe incorrecte'))
            }
          })
          .catch((error) => {
            next(new Error('Erreur lors de la comparaison du mot de passe'))
          })
      } else {
        next(new Error('Utilisateur introuvable'))
      }
    })
    .catch((error) => {
      nex(new Error('Erreur serveur'))
    })
}

function constructWhere(req) {
  let where = new Object()
  if (req.query.valide) {
    where.valide = req.query.valide === 'true' ? true : false
  }
  if (req.query.prestataire) {
    where.prestataire = req.query.prestataire === 'true' ? true : false
  }
  if (req.query.nom) {
    where.nom = req.query.nom
  }
  if (req.query.prenom) {
    where.nom = req.query.prenom
  }
  if (req.query.tel) {
    where.tel = req.query.tel
  }
  if (req.query.email) {
    where.email = req.query.email
  }
  if (req.query.quartier) {
    where.quartier = req.query.quartier
  }
  if (req.query.ville) {
    where.ville = req.query.ville
  }
  if (req.query.verifie) {
    where.verifie = req.query.verifie === 'true' ? true : false
  }
  if (req.query.societe) {
    where.societe = req.query.societe === 'true' ? true : false
  }
  if (req.query.service || req.query.domaine) {
    if (req.query.service && req.query.service.length > 0) {
      where.services = { some: { libelle: { contains: req.query.service } } }
    }
    if (req.query.domaine && req.query.domaine.length > 0) {
      where.services = {
        some: { domaine: { libelle: { contains: req.query.domaine } } },
      }
    }
  }
  if (req.query.outils) {
    where.outils = { some: { nom: { in: req.query.outils.split(',') } } }
  }
  if (req.query.note) {
    where.avgNote = { gte: +req.query.note }
  }
  return where
}

function constructOrderBy(req) {
  let orderBy = {}
  if (req.query.sort) {
    switch (req.query.sort) {
      case 'note asc':
        orderBy.avgNote = 'asc'
        break
      case 'note desc':
        orderBy.avgNote = 'desc'
        break
      case 'nom asc':
        orderBy.nom = 'asc'
        break
      case 'nom desc':
        orderBy.nom = 'desc'
        break
    }
    return orderBy
  }
}

exports.search = (req, res, next) => {
  prisma.user
    .findMany({
      where: constructWhere(req),
      include: { services: { include: { domaine: true } } },
      orderBy: constructOrderBy(req),
    })
    .then((users) => {
      if (!(users && users.length > 0)) {
        throw new Error('Aucun résultat')
      }
      res.json(users)
    })
    .catch((error) => {
      next(error)
    })
}
