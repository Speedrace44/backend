global.TextEncoder = require("util").TextEncoder
global.TextDecoder = require("util").TextDecoder
const app = require('./app')
const http = require('http')
const config = require('./config')
const logger = require('./logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
