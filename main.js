const app = require('./views/app')
const config = require('./config/config.json')
const handleMessage = require('./utils/message')

app.server(function(connection, type = 'connect') {
  if (type === 'connect') {
    app.connectionList.push(connection)

    connection.on('text', function(result) {
      handleMessage(JSON.parse(result))
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
}).listen(config.Port, config.Host, function() {
  console.log(`websocket启动在 ${config.Host}:${config.Port}`)
})
