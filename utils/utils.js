
/**
 * data转换成get参数
 * @param {Object} params 请求的data
 * @returns {string}
 */
function tansParams (params = {}) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result
}
/**
 * 判断是否包含bot名字开头
 * @param {Object} message 消息包体
 * @returns {Boolean}
 */
function atme (message = {}) {
  const reg = new RegExp(`/^[${this.app.config.name.join(',')}]/`)
  return reg.test(message.message)
}
/**
 * 去除前置的名字
 * @param {String} message 需要过滤的消息
 * @returns 消息
 */
function removeName (message = '') {
  for(let i = 0; i < this.app.config.name.length; i++) {
    if ((new RegExp(`/^${this.app.config.name[i]}/`)).test(message)) {
      message.replace(`/^${this.app.config.name[i]}/`, '')
      break
    }
  }
  return message
}

/**
 * 
 * @param {Object} coon socket包体
 * @param {Object} message 消息包体
 * @param {Object} msg 需要发送的信息
 */
function sendMessage (conn, message, params) {
  if (message.message_type === 'group') {
    data.action = 'send_group_msg'
    data.params = {
      group_id: message.group_id,
      auto_escape: true,
      ...params,
    }
  } else if (message.message_type === 'private') {
    data.action = 'send_private_msg'
    data.params = {
      user_id: message.user_id,
      auto_escape: true,
      ...params,
    }
  }
  conn.sendText(JSON.stringify(data))
}

class Utils {
  init(app) {
    this.app = app
    this.tansParams = tansParams
    this.atme = atme
    this.removeName = removeName
    this.sendMessage = sendMessage
    return this
  }
}
module.exports = {
  Utils,
  tansParams,
  atme,
  removeName,
  sendMessage
}