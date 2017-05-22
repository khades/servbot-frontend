var m = require("mithril")
var model = require("../models/LogsModel")
require("../../../scss/modules/_user-logs.scss")
var generateClass = function (f) {
  if (f.messageType == "timeout")
    return "user-logs__history__timeout"
  if (f.messageType == "ban")
    return "user-logs__history__ban"
  return "user-logs__history__message-body"
}
var generateMessagebody = function (f) {
  if (f.messageType == "timeout")
    return `Таймаут на ${f.banLength} секунд`
  if (f.messageType == "ban")
    return `Перманентный бан`
  return f.messageBody
}
var LogsComponent = {
  view: function (vnode) {
    return m("div.user-logs", [


      !!model.result.knownNicknames && model.result.knownNicknames > 1 ? `Так же известен как ${model.result.knownNicknames.join(", ")}` : "", !!model.result.bans ?
      m(".user-logs__bans", [
        m(".user-logs__bans-header", `Баны пользователя ${model.result.user} на канале ${model.result.channel}`),
        model.result.bans.map(f => m(".user-logs__ban-item", [
                    m(".user-logs__ban-type", f.type == "timeout" ? `Таймаут (${f.duration})` : 'Перманентный бан'),
          m(".user-logs__ban-date", new Date(f.date).toLocaleString())

        ]))
      ]) :
      "",
      m(".user-logs__header", `Логи пользователя ${model.result.user} на канале ${model.result.channel}`), !!model.result.messages ? model.result.messages.map(f => m(".user-logs__history", [
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

module.exports = LogsComponent