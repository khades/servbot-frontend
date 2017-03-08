var m = require("mithril")

var LogsComponent = require("./components/LogsComponent")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var LogsModel = require("./models/LogsModel")
var routes = require("../pageTemplate/routes")
var LogsPageComponent = {
  oninit: function (vnode) {
    LogsModel.init(vnode.attrs)
  },
  onupdate: function (vnode) {
    if (m.route.get() != LogsModel.route) {
      LogsModel.init(vnode.attrs)
    }
  },
  view: function (vnode) {
    return m(PageTemplateComponent, {
      getState: () => {
        return LogsModel.state
      },
      route: routes.LOGS,
      channelID: () => { return vnode.attrs.channel },
      channel: () => { return LogsModel.result.channel },
      title: `Логи пользователя ${vnode.attrs.username} на канале ${vnode.attrs.channel}`,
      content: m(LogsComponent)
    })
  }
}
module.exports = LogsPageComponent