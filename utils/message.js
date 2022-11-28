function handleMessage (message) {
  switch (message.post_type) {
    case 'meta_event':
      if (message.meta_event_type === 'heartbeat') return
      console.log('元事件', message)
      break;
    case 'message':

      if (message.message_type === 'private') {
        console.log(`
          收到私聊
          ${message.sender.nickname}[${message.user_id}]： ${message.message}
        `)
      } else if (message.message_type === 'private') {
        console.log(`
          收到群消息
          来自 ${message.group_id}
          ${message.sender.card}[${message.user_id}]： ${message.message}
        `)
      }

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