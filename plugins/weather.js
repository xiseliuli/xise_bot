// 天气查询

const api = require('../api')

function realtime (conn, message) {

}

function weather (conn, message) {
  
}

module.exports = {
  name: '实时天气;天气预报',
  cmd: [ /天气$/, /天气预报$/ ],
  level: 5,
  functions: [ realtime, weather ]
}