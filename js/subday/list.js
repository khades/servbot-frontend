var model = require("./models/list")
var m = require("mithril")
var channelName = require("../utils/channelName")
var input = require("../basicWidgets/components/InputComponent")
var textarea = require("../basicWidgets/textarea")
var multiinput = require("../basicWidgets/multiinput")
var check = require("../basicWidgets/components/CheckBoxComponent")
var states = require("../utils/states.js")
var routes = require("../pageTemplate/routes")
var loading = require("../basic/loading")
var l10n = require("../l10n/l10n")
require("../../scss/modules/_subday-list.scss")
module.exports = {
    oninit: function (vnode) {
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"))
    },

    onupdate: function (vnode) {
        if (vnode.state.route == m.route.get())
            return
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"))
    },
    route: routes.SUBDAY,
    getTitle() {
        return l10n.get("SUBDAYS_TITLE", channelName.get(m.route.param("channel")))
    },

    view: function (vnode) {
        if (model.state != states.READY) {
            return m(loading)
        }
        return m(".subday-list", [
            m("h1", l10n.get("SUBDAYS_TITLE", channelName.get(m.route.param("channel")))),
            m(".subday-list__items", model.objects.map(f => {
                return m(".subday-list__item", [
                    m("a.subday-list__name", {
                        class: f.isActive ? "subday-list__name--is-active" : "",
                        href: `/channel/${f.channelID}/subdays/${f.id}`,
                        oncreate: m.route.link
                    }, f.name),
                    m(".subday-list__date", new Date(f.date).toLocaleString())
                ])
            }))
        ])
    }
}