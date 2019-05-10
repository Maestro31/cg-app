const express = require('express')
const router = express.Router()
const admin = require('firebase-admin')

const database = admin.database()

router.get('/createUser', (req, res) => {
  const { uid } = req.params

  if (!uid) res.send({ error: 'Paramètre uid manquant' })

  database.ref('users').push(uid, e => {
    if (e) {
      res.send({ error: e })
      return
    }

    res.status(201)
  })
})
