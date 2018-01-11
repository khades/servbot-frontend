var m = require("mithril")
var model = require("../models/LogUsersPageModel")
var PaginatorComponent = require("../../basicWidgets/components/PaginatorComponent")
require("../../../scss/modules/_channel-users.scss")
var input = require("../../basicWidgets/components/InputComponent")
var channelName = require("../../utils/channelName")

var LogusersComponent = {
    view: function (vnode) {

        return m(".channel-users", [
            m(".channel-users__header", `Список пользователей на канале ${channelName.get(model.channelID)}`),
            m("", "Выводится 100 последних активных пользователей"),
            m("input", {
                value: model.filter,
                onchange: m.withAttr("value", function (value) {
                    model.setFilter(value)
                    return true
                }),
                placeholder:"Введите имя пользователя"
            }),

            !!model.results ? m(".channel-users__container", model.results.map(user => {
                return m("a.channel-users__container__user-link", {
                    oncreate: m.route.link,
                    href: "/channel/" + model.channelID + "/logs/" + user.userID
                }, [
                    m("span.channel-users__container__user-link__user", `${user.user}`)
                ])
            })) : null
        ])

    }
}
module.exports = LogusersComponent