const roundRouter = require('express').Router()
const Round = require('./round')
//const jwt = require('jsonwebtoken')

roundRouter.get('/', async (request, response) => {
  const rounds = await Round.find({})
  response.json(rounds)
})

roundRouter.post('/', async (request, response) => {
  const body = request.body

  const round = new Round(body)

  const savedRound = await round.save()
  response.json(savedRound)
})

module.exports = roundRouter
