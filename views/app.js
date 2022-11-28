const server = require('../utils/websocket')

const plugins =  require('../plugins')
console.log("🚀 ~ file: app.js ~ line 4 ~ plugins", plugins)


const app = {
  connectionList: [],
  server,
  plugins
}

module.exports = app