var m = require("mithril")
var LogsModel = require("../models/LogsModel")
var Animation = require("../../utils/Animation")

var LogsComponent = {
  oncreate: function (vnode) {
    Animation.fadeIn(vnode)
  },
  view: function (vnode) {
    return m("div", [
      m("p", `Логи пользователя ${LogsModel.username} на канале ${LogsModel.channel}`),
      m("table", [
        m("thead", m("tr"), [
          m("th", "Дата"),
          m("th", "Сообщение")
        ]), (!!LogsModel.result && !!LogsModel.result.Messages) ? m("tbody", LogsModel.result.Messages.map(function (message) {
          return m("tr", [
            m("td", new Date(message.Date).toLocaleString()),
            m("td", message.MessageBody)
          ])
        })) : ""
      ])
    ])
  }
}

module.exports = LogsComponent