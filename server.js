require('dotenv').config()

const express = require('express')
const { join } = require('path')

const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const { User } = require('./models')
const syncDB = require('./db')

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, ({ id }, cb) => User.findById(id)
  .populate('transactions')
  .then(user => cb(null, user))
  .catch(err => console.log(err))))

app.use(require('./routes'))

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 3000

syncDB()
  .then(() => app.listen(PORT))
  .catch(err => console.log(err))