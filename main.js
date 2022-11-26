const server = require('./websocket')
const Host = '127.0.0.1'
const Port = 8001
const userList = []

server.listen(Port, Host, function() {
  console.log(`websocket启动在 ${Host}:${Port}`)
})

console.log(server.connections)