var m = require("mithril")
var LogsModel = require("../models/LogsModel")
var Animation = require("../../utils/Animation")
var Paginator = require("../../basicWidgets/components/PaginatorComponent")
var LogsComponent = {
  oncreate: function (vnode) {
    Animation.fadeIn(vnode)
  },
  view: function (vnode) {
    return m("div", [
      m("p", `Логи пользователя ${LogsModel.username} на канале ${LogsModel.channel}, всего ${!!LogsModel.result ? LogsModel.result.Count : 0} сообщений`),
      m(Paginator, {
        getPage: function () {
          return LogsModel.page
        },
        setPage: function (page) {
          LogsModel.goToPage(page)
        },
        pages:
          !!LogsModel.result ? Math.ceil(LogsModel.result.Count / LogsModel.pageSize) : 0

      }),
      m("table", [
        m("thead", m("tr"), [
          m("th", "Дата"),
          m("th", "Сообщение")
        ]), (!!LogsModel.result && !!LogsModel.result.Messages) ? m("tbody", LogsModel.result.Messages.map(function (message) {
          return m("tr", [
            m("td", message.Date),
            m("td", message.MessageBody)
          ])
        })) : ""
      ])
    ])
  }
}

module.exports = LogsComponent