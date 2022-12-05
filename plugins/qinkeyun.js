const { qingyunkeAI } = require('../api/qingyunke')
function AI(conn, message) {
  qingyunkeAI({
    msg: message.message
  })
    .then(res => {
      console.log("🚀 ~ file: qinkeyun.js:14 ~ AI ~ res", res)
      const msg = '12312313'
      const data = {}
      if (message.message_type === 'group') {
        data.actions = '/send_group_msg'
        data.params = {
          group_id: message.group_id,
          message: msg,
          auto_escape: true
        }
      } else if (message.message_type === 'private') {
        data.actions = '/send_private_msg'
        data.params = {
          user_id: message.user_id,
          message: msg,
          auto_escape: true
        }
      }
      conn.sendText(JSON.stringify(data))
    })
}

module.exports = {
  name: '青客云AI',
  cmd: ['夕色'],
  level: 5,
  functions: [AI]
}