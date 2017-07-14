var m = require("mithril")

var LogsComponent = require("./components/LogsComponent")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var LogsModel = require("./models/LogsModel")
var routes = require("../pageTemplate/routes")
var LogsPageComponent = {
  oninit: function (vnode) {
    LogsModel.get(vnode.attrs.channel, vnode.attrs.userID)
  },
  onupdate: function (vnode) {
    if (m.route.get() != LogsModel.route) {
      LogsModel.init(vnode.attrs.channel, vnode.attrs.userID)
    }
  },
  view: function (vnode) {
    return m(PageTemplateComponent, {
      getState: () => {
        return LogsModel.state
      },
      route: routes.LOGS,
      channelID: () => { return vnode.attrs.channel },
      title: `Логи пользователя ${vnode.attrs.username} на канале ${vnode.attrs.channel}`,
      content: m(LogsComponent)
    })
  }
}
module.exports = LogsPageComponent