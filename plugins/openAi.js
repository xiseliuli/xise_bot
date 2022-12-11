const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: global.config.openAIKey,
});
const openai = new OpenAIApi(configuration);

async function AI (conn, message) {
  message.message = message.message.replace(/^[openai,,openai:,openai：]/, '')
  message.message = message.message.replace(/^openai /, '')
  const res = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message.message,
    temperature: 0.98,
    max_tokens: 3000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  let msg = ''
  const data = {}
  if (res.status === 200) {
    msg = res.data.choices[0].text
  } else {
    msg = JSON.stringify({status: res.status, data: res.data})
  }
  console.log('🚀 ~ file: openAi.js:25 ~ AI ~ msg', msg)
  msg = msg.replace(/^[/n,/n/n, \r, \r\r]/, '')
  msg = msg.replace(/^\s*/g, '');

  if (message.message_type === 'group') {
    data.action = 'send_group_msg'
    data.params = {
      group_id: message.group_id,
      message: msg,
      auto_escape: true
    }
  } else if (message.message_type === 'private') {
    data.action = 'send_private_msg'
    data.params = {
      user_id: message.user_id,
      message: msg,
      auto_escape: true
    }
  }
  conn.sendText(JSON.stringify(data))
}

module.exports = {
  name: 'openai',
  cmd: [/^openai/],
  level: 5,
  functions: [AI]
}