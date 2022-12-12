const express = require('express')
const userRoutes = require('./routes/user')
const serviceRoutes = require('./routes/service')
const missionRoutes = require('./routes/mission')
const noteRoutes = require('./routes/note')
const outilRoutes = require('./routes/outil')
const photoRoutes = require('./routes/photo')
const path = require('path')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', userRoutes)
app.use('/api/service', serviceRoutes)
app.use('/api/mission', missionRoutes)
app.use('/api/note', noteRoutes)
app.use('/api/outil', outilRoutes)
app.use('/api/photo', photoRoutes)

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})

module.exports = app
