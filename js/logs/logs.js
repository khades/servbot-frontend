var m = require("mithril")
var model = require("./models/logs")
require("../../scss/modules/_user-logs.scss")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")
var l10n = require("../l10n/l10n")

var generateClass = function (f) {
  if (f.messageType == "timeout")
    return "user-logs__history__timeout"
  if (f.messageType == "ban")
    return "user-logs__history__ban"
  return "user-logs__history__message-body"
}
var generateMessagebody = function (f) {
  if (f.messageType == "timeout")
    return l10n.get("BANS_TIMEOUT", f.banLength)
  if (f.messageType == "ban")
    return l10n.get("BANS_PERMANENT")
  return f.messageBody
}


module.exports = {
  oninit: function (vnode) {
    vnode.state.route = m.route.get()
    model.get(m.route.param("channel"), m.route.param("userID"))
  },

  onupdate: function (vnode) {
    if (vnode.state.route == m.route.get())
      return
    vnode.state.route = m.route.get()
    model.get(m.route.param("channel"), m.route.param("userID"))
  },

  route: routes.LOGS,
  getTitle() {
    return l10n.get("USER_LOGS", !!model.result.user ? model.result.user : "", channelName.get(m.route.param("channel")))
  },
  view: function (vnode) {
    return m(".user-logs", [!!model.result.bans ?
      m(".user-logs__bans", [
        m(".user-logs__bans-header", l10n.get("USER_BANS", !!model.result.user ? model.result.user : "", channelName.get(m.route.param("channel")))),
        model.result.bans.map(f => m(".user-logs__ban-item", [
          m(".user-logs__ban-type", f.type == "timeout" ? l10n.get("BANS_TIMEOUT", f.duration) : l10n.get("BANS_PERMANENT")),
          m(".user-logs__ban-date", new Date(f.date).toLocaleString())

        ]))
      ]) : "",
      m(".user-logs__header", l10n.get("USER_LOGS", !!model.result.user ? model.result.user : "", channelName.get(m.route.param("channel")))), !!model.result.knownNicknames && model.result.knownNicknames.length > 1 ? l10n.get("USER_AKA", model.result.knownNicknames.join(", ")) : "",

      !!model.result.messages ? model.result.messages.map(f => m(".user-logs__history", [
        m(".user-logs__history__row", [
          m(".user-logs__history__username", f.username),
          m(".user-logs__history__date", new Date(f.date).toLocaleString())
        ]),
        m("div", {
          class: generateClass(f)
        }, generateMessagebody(f)),
      ])) :
      ""
    ])
  }
}