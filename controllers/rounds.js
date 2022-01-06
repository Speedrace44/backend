const roundRouter = require('express').Router()
const Round = require('../models/round')
//const jwt = require('jsonwebtoken')

roundRouter.get('/', async (request, response, next) => {
  const rounds = await Round.find({})
  response.json(rounds)
  next()
})

roundRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id
  const round = await Round.findById(id)
  if(round){
    response.json(round)
  }
  else{
    response.status(404).end()
  }
  next()
})

roundRouter.post('/', async (request, response, next) => {
  const body = request.body

  const round = new Round(body)

  const savedRound = await round.save()
  response.json(savedRound)
  next()
})

roundRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  await Round.findByIdAndRemove(id)
  response.status(204).end()
})

roundRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const id = request.params.id

  const round = await Round.findByIdAndUpdate(id, {...body})
  if(round){
    await round.save()
    response.status(204).end()
  }
  else{
    response.status(404).end()
  }
})

module.exports = roundRouter
