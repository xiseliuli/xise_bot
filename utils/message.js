const { atme, removeName } = require('../utils/utils')
function handleMessage (app, message, connection) {
  const { plugins } = app
  switch (message.post_type) {
    case 'meta_event':
      if (message.meta_event_type === 'heartbeat') return
      console.log('元事件', message)
      break;
    case 'message':
      if (message.message_type === 'private') {
        console.log(`收到私聊
          ${message.sender.nickname}[${message.user_id}]： ${message.message}`)
      } else if (message.message_type === 'group') {
        console.log(`收到群消息
          来自 ${message.group_id}
          ${message.sender.card}[${message.user_id}]： ${message.message}`)
      }
      Object.keys(plugins).forEach(key => {
        let flag = true
        if (key != 'qinkeyun') {
          const { cmd, functions } = plugins[key]
          if (atme(message.message)) {
            message.message = removeName(message.message)
          }
          cmd.forEach((item, index) => {
            if (typeof item === 'string') {
              item = new RegExp(`/^[${item}]$/`)
            }
            if (item.test(message)) {
              flag = false
              functions[index](connection, message)
              console.log('触发函数', key, item)
            }
          })
        }
        if (flag) {
          plugins.qinkeyun.functions[0](connection, message)
        }
      })
      break;
    case 'request':
      console.log('收到请求', message)
      break;
    case 'notice':
      console.log('收到通知', message)
      break;
    default:
      console.log('收到消息', message)
      break;
  }
}


module.exports = handleMessage