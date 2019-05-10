const express = require('express')
const passport = require('passport')
const session = require('express-session')
const auth = require('./routes/auth')
const user = require('./routes/user')
const path = require('path')

const admin = require('firebase-admin')

const serviceAccount = require('./firebase-key.json')

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://config-gamer-app.firebaseio.com'
})

const app = express()

app.use(
  session({
    secret: 'p@ssword',
    resave: true,
    saveUninitialized: true
  })
)

// app.use(passport.initialize())

app.use('/auth', auth)
app.use('/user', user)

app.get('/', function(req, res) {
  const database = firebaseApp.database()

  console.log(
    admin
      .auth()
      .getUserByEmail('maestro.31@laposte.net')
      .then(user => {
        console.log(user.toJSON())
      })
  )

  //res.sendFile(path.join(__dirname, 'views/login.html'));
})

app.listen(3001)
