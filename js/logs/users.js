var m = require("mithril")
var model = require("./models/users")
var PaginatorComponent = require("../basicWidgets/components/PaginatorComponent")
require("../../scss/modules/_channel-users.scss")

var input = require("../basicWidgets/components/InputComponent")
var channelName = require("../utils/channelName")
var routes = require("../pageTemplate/routes")
var l10n = require("../l10n/l10n")


module.exports = {
    oninit: function (vnode) {
        vnode.state.route = m.route.get()
        model.init(m.route.param("channel"))
    },

    onupdate: function (vnode) {
        if (vnode.state.route == m.route.get())
            return
        vnode.state.route = m.route.get()
        model.init(m.route.param("channel"))
    },


    route: routes.LOGS,
    getTitle: () => {
        return l10n.get("USER_LIST", channelName.get(m.route.param("channel")))
    },
    view: function (vnode) {

        return m(".channel-users", [
            m(".channel-users__header", l10n.get("USER_LIST", channelName.get(m.route.param("channel")))),
            m("", l10n.get("USER_LIST_TOP_100_SHOWN")),
            m("input", {
                value: model.filter,
                onchange: m.withAttr("value", function (value) {
                    model.setFilter(value)
                    return true
                }),
                placeholder: l10n.get("USER_LIST_INPUT_PLACEHOLDER")
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