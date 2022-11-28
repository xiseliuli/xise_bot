import request from '../utils/request'

export function qingyunkeAI(params) {
  // 编码
  // encodeURIComponent(msg)
  // 解码
  // decodeURIComponent(UrlEncode)
  
  if (params.msg) params.msg = encodeURIComponent(msg)
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