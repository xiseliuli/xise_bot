const request = require('../utils/request')

function qingyunkeAI(params) {
  console.log("🚀 ~ file: qingyunke.js:4 ~ qingyunkeAI ~ params", params)
  // 编码
  // encodeURIComponent(msg)
  // 解码
  // decodeURIComponent(UrlEncode)
  
  if (params.msg) params.msg = encodeURIComponent(params.msg)
  return request({
    url: 'http://api.qingyunke.com/api.php',
    method: 'get',
    data: {
      key: 'free',
      appid: 0,
      ...params
    }
  })
}

module.exports = {
  qingyunkeAI
}