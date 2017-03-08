var m = require("mithril")
var model = require("../models/LogsModel")
require("../../../scss/modules/_user-logs.scss")
var LogsComponent = {
  view: function (vnode) {
    return m("div.user-logs", [
      m(".user-logs__header", `Логи пользователя ${model.result.user} на канале ${model.result.channel}`),

      !!model.result.knownNicknames && model.result.knownNicknames > 1 ? `Так же известен как ${model.result.knownNicknames.join(", ")}` : m(".nothing"),

      !!model.result.messages ? model.result.messages.map(f => m(".user-logs__history", [
        m(".user-logs__history__row", [
          m(".user-logs__history__username", f.username),
          m(".user-logs__history__date", new Date(f.date).toLocaleString())
        ]),
        m(".user-logs__history__message-body", f.messageBody),
      ])) :
      m(".nothing")
    ])
  }
}

module.exports = LogsComponent