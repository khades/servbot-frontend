var m = require("mithril")
var LogsModel = require("../models/LogsModel")
var Animation = require("../../utils/Animation")
require("../../../scss/modules/_table.scss")
var LogsComponent = {
  oncreate: function (vnode) {
    Animation.fadeIn(vnode)
  },
  view: function (vnode) {
    return m("div", [
      m("p", `Логи пользователя ${LogsModel.result.user} на канале ${LogsModel.result.channel}`),
      m("table", [
        m("thead", m("tr"), [
          m("th", "Дата"),
          m("th", "Сообщение")
        ]), (!!LogsModel.result && !!LogsModel.result.messages) ? m("tbody", LogsModel.result.messages.map(function (message) {
          return m("tr", [
            m("td", new Date(message.date).toLocaleString()),
            m("td", message.messageBody)
          ])
        })) : ""
      ])
    ])
  }
}

module.exports = LogsComponent