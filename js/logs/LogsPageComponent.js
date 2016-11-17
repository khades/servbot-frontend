var m = require("mithril")
var LogsComponent = require("./components/LogsComponent")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var LogsModel = require("./models/LogsModel")

var LogsPageComponent = {

  oninit: function (vnode) {
    if (!!vnode.attrs.page) {
      LogsModel.page = vnode.attrs.page
    } else {
      LogsModel.page = 1
    }
    LogsModel.username = vnode.attrs.username
    LogsModel.channel = vnode.attrs.channel
    LogsModel.run()
  },

  view: function (vnode) {
    return m(PageTemplateComponent, {
      route: "logs",
      title: `Логи пользователя ${vnode.attrs.username} на канале ${vnode.attrs.channel}`,
      content: m(LogsComponent)
    })
  }
}
module.exports = LogsPageComponent
