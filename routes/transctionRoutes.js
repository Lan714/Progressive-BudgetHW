const router = require('express').Router()
const { Transaction, User } = require('../models')
const passport = require('passport')

router.get('/transactions', passport.authenticate('jwt'), async function (req, res) {
  const transaction = await Transction.find({}).populate('user')
  res.json(transactions)
})

router.post('/transactions', passport.authentic('jwt'), async function (req, res) {
  const transaction = await Transaction.create({ ...req.body, user: req.body._id })
  await User.findByIdAndUpdate(req.user._id, {$push: { transaction: transaction._id } })
  res.json(transaction)
})

router.post('/transaction/bulk', passport.authenticate('jwt'), async function (req, res) {
  const transctions = await Transaction.create(req.body.map(transaction => ({ ...transaction, user: req.user._id })))
  await User.findByIdAndUpdate(req.user._id, { $push: { transctions: { $each: transctions.map(transction => transction._id) } } })
  res.json(transctions)
})

router.put('/transactions/:id', passport.authenticate('jwt'), async function (req, res) {
  await Transction.findByIdAndUpdate(req.params.id, { $set: req.body })
  res.sendStatus(200)
})

router.delete('/transaction/:id', passport.authenticate('jwt'), async function (req, res) {
  await Transaction.findByIdAndUpdate(req.params.id)
  res.sendStatus(200)
})

module.exports = router