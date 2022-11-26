// websocket.js
const ws = require("nodejs-websocket");

const createServer = () => {
	let server = ws.createServer(function (connection) {
    console.log("New connection")
    connection.on('text', function(result) {
      const response = JSON.parse(result)
      switch (response.post_type) {
        case 'meta_event':
          console.log('心跳')
          break;
        case 'message':
          console.log('收到消息', response)
          if (response.user_id === 1097398812) {
            connection.sendText(JSON.stringify({
              action: "send_private_msg",
              params: {
                user_id: 1097398812,
                message: "参数值"
              }
            }))
          }
          break;
        default:
          console.log('收到消息', response)
          break;
      }
    })
    connection.on('connect', function(code) {
      console.log('开启连接', code)
    })
    connection.on('close', function(code) {
      console.log('关闭连接', code)
    })
    connection.on('error', function(code) {
      console.log('异常关闭', code)
    })
  })
	return server;
};

module.exports = createServer();
