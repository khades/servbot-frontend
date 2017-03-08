var m = require("mithril")

var LogsComponent = require("./components/LogsComponent")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var LogsModel = require("./models/LogsModel")

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
      route: "logs",
      title: `Логи пользователя ${vnode.attrs.username} на канале ${vnode.attrs.channel}`,
      content: m(LogsComponent)
    })
  }
}
module.exports = LogsPageComponent