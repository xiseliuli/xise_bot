const request = require('../utils/request')
const config = require('../config/config.json')
/**
 * 
 * @param {Object} params 参数对象，包含lng经度、lat维度
 * @returns 
 */
// 实时天气
function realtime(params) {
  return request({
    url: `https://api.caiyunapp.com/v2.5/${config.weatherToken}/${params.lng, params.lat}/realtime.json`,
    method: 'get'
  })
}
// 天气预报
function weather(params) {
  return request({
    url: `https://api.caiyunapp.com/v2.5/${config.weatherToken}/${params.lng, params.lat}/weather.json`,
    method: 'get'
  })
}


module.exports = {
  realtime,
  weather
}