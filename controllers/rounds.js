const roundRouter = require('express').Router()
const Round = require('../models/round')
//const jwt = require('jsonwebtoken')

roundRouter.get('/', async (request, response, next) => {
  const rounds = await Round.find({user: request.user._id})
  response.json(rounds)
})

roundRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id
  const round = await Round.findById(id)
  if(round){
    response.json(round)
    response.status(204).end()
  }
  else{
    response.status(404).end()
  }
})

roundRouter.post('/', async (request, response, next) => {
  const body = request.body
  const round = new Round({...body, user: request.user._id})

  const savedRound = await round.save()
  request.user.rounds = request.user.rounds.concat(savedRound._id)
  await request.user.save()
  response.json(savedRound)
})

roundRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  try{
    await Round.findByIdAndRemove(id)
    response.status(204).end()
  }
  catch{
    response.json(undefined)
  }
})

roundRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const id = request.params.id

  try{
    const round = await Round.findByIdAndUpdate(id, {...body})
    await round.save()
    response.status(204).end()
  }
  catch{
    response.json(undefined)
  }
})

module.exports = roundRouter
