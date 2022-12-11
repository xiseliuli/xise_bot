// 天气查询

const api = require('../api')
const sendMessage = require('../utils/utils')
function realtime (conn, message) {
  message.message = message.message.replace(/天气$/, '')
  api.map.ReverseAddressResolutionProtocol(message.message)
    .then(_ => {
      
      console.log("🚀 ~ file: weather.js:8 ~ realtime ~ result", _)
      if (_.result || _.result.location) {
        api.weather.realtime(_.result.location).then(res => {
          console.log("🚀 ~ file: weather.js:11 ~ realtime ~ res", res)
        })
        return
      }
    })
}

function weather (conn, message) {
  
}

module.exports = {
  name: '实时天气;天气预报',
  cmd: [ /天气$/, /天气预报$/ ],
  level: 5,
  functions: [ realtime, weather ]
}