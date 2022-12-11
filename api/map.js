const request = require('../utils/request')

/**
 * 
 * @param {String} params 地址
 * @returns json
 */
function ReverseAddressResolutionProtocol (params) {
  return request({
    url: 'https://apis.map.qq.com/ws/geocoder/v1/',
    methos: 'get',
    params: {
      address: params,
      key: global.config.tmapKey
    }
  })
}

module.exports = {
  ReverseAddressResolutionProtocol
}