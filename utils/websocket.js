// websocket.js
const ws = require("nodejs-websocket");

const createServer = (cb) => {
	let server = ws.createServer(function (connection) {
    console.log("New connection")
    if (typeof cb === 'function') cb(connection)
    
    connection.on('connect', function(code) {
      console.log('开启连接', code)
    })
    connection.on('close', function(code) {
      console.log('关闭连接', connection)

    })
    connection.on('error', function(code) {
      console.log('异常关闭', code)
    })
  })
	return server;
};

module.exports = createServer
