const mongoose = require('mongoose')

const roundSchema = new mongoose.Schema({
  round: Number,
  year: String,
  decision: String,
  tournament: String,
  format: String,
  side: String,
  position: String,
  date: String,
  case: String,
  background: String,
  speaks: Number,
  rank: Number,
  partner: {
    name: String,
    speaks: Number,
    rank: Number,
  },
  judges: [
    {
      name: String,
      chair: Boolean,
    }
  ],
  opponents: [
    {
      name: String,
    }
  ],
  rfd: String,
  notes: String,
})

roundSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Round', roundSchema)
