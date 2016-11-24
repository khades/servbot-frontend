var m = require("mithril")
var LogUsersPageModel = require("../models/LogUsersPageComponent")
var Paginator = require("../../basicWidgets/components/PaginatorComponent")

var LogUsersComponent = {
    view: function (vnode) {
        var results = LogUsersPageModel.getResults()
        return m(".channel-users", [
            m("input", {
                onchange: m.withAttr("value", function (value) {
                    LogUsersPageModel.setFilter(value)
                })
            }),
            m(Paginator, {
                getPage: function () {
                    return LogUsersPageModel.page
                },
                setPage: function (page) {
                    LogUsersPageModel.page = page
                    m.redraw()
                },
                pages: Math.ceil(results.count / LogUsersPageModel.pageSize)

            }),
            m(".channel-users__container", results.users.map(user => {
                return m("a", {
                    oncreate: m.route.link,
                    href: "/channel/" + LogUsersPageModel.channel + "/logs/" + user.User + "/1"
                }, m("div.channel-users__user-info", [
                    m("span.channel-users__user", user.User),
                    m("div.channel-users__counter", [
                        m("span.channel-users__count-icon"),
                        m("span.channel-users__count", user.Count)
                    ])
                ]))
            }))
        ])

    }
}
module.exports = LogUsersComponent