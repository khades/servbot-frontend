var m = require("mithril")
var LogUsersPageModel = require("../models/LogUsersPageComponent")
var Paginator = require("../../basicWidgets/components/PaginatorComponent")

var LogUsersComponent = {
    view: function (vnode) {
        var results = LogUsersPageModel.getResults()
        return m(".channel-users", [
            m("input", {
                oninput: m.withAttr("value", function (value) {
                    LogUsersPageModel.setFilter(value)
                })
            }),
            results.count == 100 ? m(Paginator, {
                getPage: function () {
                    return LogUsersPageModel.page
                },
                setPage: function (page) {
                    LogUsersPageModel.page = page
                    m.redraw()
                },
                pages: Math.ceil(results.count / LogUsersPageModel.pageSize)

            }) : m(".nothing"),
            m(".channel-users__container", results.users.map(user => {
                return m("a..channel-users__container__user-link", {
                    oncreate: m.route.link,
                    href: "/channel/" + LogUsersPageModel.channel + "/logs/" + user.User
                }, m("span.channel-users__container__user-link__user", user.User))
            }))
        ])

    }
}
module.exports = LogUsersComponent