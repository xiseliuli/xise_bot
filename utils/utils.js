
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

function atme (message = {}) {
  const reg = new RegExp(`/^[${this.app.config.name.join(',')}]/`)
  return reg.test(message.message)
}

function removeName (message = '') {
  for(let i = 0; i < this.app.config.name.length; i++) {
    if ((new RegExp(`/^${this.app.config.name[i]}/`)).test(message)) {
      message.replace(`/^${this.app.config.name[i]}/`, '')
      break
    }
  }
  return message
}

class Utils {
  init(app) {
    this.app = app
    return this
  }
  /**
   * data转换成get参数
   * @param {Object} params 请求的data
   * @returns {string}
   */
  tansParams (params = {}) {
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
  atme (message = {}) {
    const reg = new RegExp(`^[${this.app.config.name.join(',')}]`)
    return reg.test(message.message)
  }
  /**
   * 去除前置的名字
   * @param {String} message 需要过滤的消息
   * @returns 消息
   */
  removeName (message = '') {
    for(let i = 0; i < this.app.config.name.length; i++) {
      const reg = new RegExp(`^${this.app.config.name[i]}`)
      if (reg.test(message)) {
        console.log('🚀 ~ file: utils.js:89 ~ Utils ~ removeName ~ me', message.replace(reg, ''))
        return message.replace(reg, '')
      }
    }
    return message
  }
}
module.exports = Utils