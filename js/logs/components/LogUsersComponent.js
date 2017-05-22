var m = require("mithril")
var LogUsersPageModel = require("../models/LogUsersPageModel")
var PaginatorComponent = require("../../basicWidgets/components/PaginatorComponent")
require("../../../scss/modules/_channel-users.scss")
var input = require("../../basicWidgets/components/InputComponent")
var LogusersComponent = {
    view: function (vnode) {
        var results = LogUsersPageModel.getResults()

        return m(".channel-users", [
            m(".channel-users__header",`Список пользователей на канале ${LogUsersPageModel.object.channel}`),
            m("input", {
                oninput: m.withAttr("value", function (value) {
                    LogUsersPageModel.setFilter(value)
                    return true
                })
            }),
            results.count > 100 ? m(PaginatorComponent, {
                getPage: function () {
                    return LogUsersPageModel.page
                },
                setPage: function (page) {
                    LogUsersPageModel.page = page
                    m.redraw()
                },
                pages: Math.ceil(results.count / LogUsersPageModel.pageSize)

            }) : "",
            m(".channel-users__container", results.users.map(user => {
                return m("a.channel-users__container__user-link", {
                    oncreate: m.route.link,
                    href: "/channel/" + LogUsersPageModel.channel + "/logs/" + user.userID
                }, [
                    m("span.channel-users__container__user-link__user", `${user.user}`)
                ])
            }))
        ])

    }
}
module.exports = LogusersComponent