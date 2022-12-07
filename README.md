# xise_bot

bot使用go-cq_http

### plugins

module.exports 导出格式
- name: 插件名称
- cmd: 触发指令 类型 Array 可以是正则，若为string，则会自动生成正则
- level: 触发权限
- functions: 由指令触发方法 每条指令必须对应一个方法

所有触发的方法都有两个参数
- connection 会话对象
- message 消息包体