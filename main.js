const app = require('./views/app')
const handleMessage = require('./utils/message')
const yaml = require('js-yaml');
const fs = require('fs');
const Utils = require('./utils/utils')

try {
  const config = yaml.load(fs.readFileSync('./config/config.yml', 'utf8'))
  config.name.sort((a, b) => b.length - a.length)
  global.config = config
  app.config = config
} catch (e) {
  console.log('加载配置文件有误', e);
}

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