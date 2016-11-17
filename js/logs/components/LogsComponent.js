var m = require("mithril")
var LogsModel = require("../models/LogsModel")
var Animation = require("../../utils/Animation")
var LogsComponent = {
  oncreate: function (vnode) {
    Animation.fadeIn(vnode)
  },
  view: function (vnode) {
     return m("div", [
      m("p", "Логи"),
      m(".button-container", [
        m("button", {
          type: "button",
          disabled: LogsModel.page < 2,
          onclick: function (event) {
            event.redraw = false
            LogsModel.goToPage(LogsModel.page - 1)
          }
        }, "Предыдущая страница"),
        m(".right-margin-button", {
          type: "button",
          disabled: !LogsModel.messages || LogsModel.messages.length < 99,
          onclick: function (event) {
            event.redraw = false
            LogsModel.goToPage(parseInt(LogsModel.page) + 1)
          }
        }, "Следующая страница"),
      ]),
      m("table", [
        m("thead", m("tr"), [
          m("th", "Дата"),
          m("th", "Сообщение")
        ]), !!LogsModel.messages ? m("tbody", LogsModel.messages.map(function (message) {
          return m("tr", [
            m("td", message.date),
            m("td", message.message)
          ])
        })) : ""
      ])
    ])
  }
}

module.exports = LogsComponent
