const server = require('../utils/websocket')

const yaml = require('js-yaml');
const fs = require('fs');

try {
  const config = yaml.load(fs.readFileSync('./config/config.yml', 'utf8'))
  config.name.sort((a, b) => b.length - a.length)
  global.config = config
} catch (e) {
  console.log('加载配置文件有误', e);
}

const plugins =  require('../plugins')
console.log("🚀 ~ file: app.js ~ line 4 ~ plugins", plugins)


const app = {
  connectionList: [],
  server,
  plugins,
  config
}

module.exports = app