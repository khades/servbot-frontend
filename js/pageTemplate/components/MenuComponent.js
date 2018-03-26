var m = require("mithril")
// var Hammer = require("hammerjs")
require("../../../scss/modules/_site-menu.scss")
var routes = require("../routes")
var channelName = require("../../utils/channelName")
var l10n = require("../../l10n/l10n")
var MenuComponent = {
    oncreate: function (vnode) {
        // new Hammer(vnode.dom).on("swipeleft", function (ev) {
        //     vnode.attrs.hideMenu()
        //     m.redraw()
        // })
        // new Hammer(vnode.dom).on("swiperight", function (ev) {
        //     vnode.attrs.showMenu()
        //     m.redraw()
        // })
    },

    view: function (vnode) {
        var components = [

            m("a", {
                href: "/",
                oncreate: m.route.link,
                class: vnode.attrs.route == routes.MAIN ? "is-selected" : ""
            }, m("span", l10n.get("MAIN_PAGE"))),
        ]
        if (!!m.route.param("channel") && m.route.param("channel") != "") {
            components.push(
                m("a.site-menu--channel-link", {
                    href: `/channel/${m.route.param("channel")}`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.CHANNEL ? "is-selected" : ""
                }, m("span", l10n.get("CHANNEL", channelName.get(m.route.param("channel"))))))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/logs`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.LOGS ? "is-selected" : ""
                }, m("span", l10n.get("MESSAGE_LOGS"))))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/bans`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.CHANNELBANS ? "is-selected" : ""
                }, m("span", l10n.get("BANS"))))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/templates`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.TEMPLATES ? "is-selected" : ""
                }, m("span", l10n.get("COMMANDS"))))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/subAlert`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.SUBALERT ? "is-selected" : ""
                }, m("span", l10n.get("SUBALERTS"))))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/autoMessages`,
                    class: vnode.attrs.route == routes.AUTOMESSAGES ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", l10n.get("AUTOMESSAGES"))))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/songrequests`,
                    class: vnode.attrs.route == routes.SONGREQUESTS ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", l10n.get("SONGREQUESTS"))))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/subdays`,
                    class: vnode.attrs.route == routes.SUBDAY ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", l10n.get("SUBDAYS"))))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/subs`,
                    class: vnode.attrs.route == routes.SUBSCRIPTIONS ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", l10n.get("SUBSCRIPTIONS"))))
            // components.push(
            //     m("a", {
            //         href: `/channel/${m.route.param("channel")}/bits`,
            //         class: vnode.attrs.route == routes.BITS ? "is-selected" : "",
            //         oncreate: m.route.link
            //     }, m("span", "Битсы")))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/externalservices`,
                    class: vnode.attrs.route == routes.EXTERNAL_SERVICES ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", l10n.get("EXTERNAL_SERVICES"))))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/subtrain`,
                    class: vnode.attrs.route == routes.SUBTRAIN ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", l10n.get("SUBTRAIN"))))
        }
        return m(".site-menu", {
                onclick: e => {
                    vnode.attrs.closeMenu()
                }
            },
            components)
    }
}

module.exports = MenuComponent