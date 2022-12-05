const config = require('../config/config.json')

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
  const reg = new RegExp(`/^[${config.name.join}]/`)
  return reg.test(message.message)
}
/**
 * 去除前置的名字
 * @param {String} message 需要过滤的消息
 * @returns 消息
 */
function removeName (message = '') {
  const name = [...config.name]
  name.sort((a, b) => b.length - a.length)
  for(let i = 0; i < config.name.length; i++) {
    if ((new RegExp(`/^${config.name[i]}/`)).test(message)) {
      message.replace(`/^${config.name[i]}/`, '')
      break
    }
  }
  return message
}
module.exports = {
  tansParams,
  atme,
  removeName
}