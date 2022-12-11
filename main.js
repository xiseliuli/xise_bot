const app = require('./views/app')
const handleMessage = require('./utils/message')
const { Utils } = require('./utils/utils')

app.server(function(connection, type = 'connect') {
  if (type === 'connect') {
    app.connectionList.push(connection)

    connection.on('text', function(result) {
      handleMessage(app, JSON.parse(result), connection)
    })

  } else if (type === 'close') {
    const key = connection.key
    for (let i = 0; i <= app.connectionList.length; i++) {
      if (key === app.connectionList[i].key) {
        app.connectionList.splice(i, 1)
        break
      }
    }
  }
}).listen(global.config.Port, global.config.Host, function() {
  console.log(`websocket启动在 ${global.config.Host}:${global.config.Port}`)
})

app.utils = (new Utils()).init(app)
exports.company = app