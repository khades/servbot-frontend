var m = require("mithril")
// var Hammer = require("hammerjs")
require("../../../scss/modules/_site-menu.scss")
var routes = require("../routes")
var channelName = require("../../utils/channelName")
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
            }, m("span", "Главная страница")),
        ]
        if (!!m.route.param("channel") && m.route.param("channel") != "") {
            components.push(
                m("a.site-menu--channel-link", {
                    href: `/channel/${m.route.param("channel")}`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.CHANNEL ? "is-selected" : ""
                }, m("span", `Канал ${channelName.get(m.route.param("channel"))}`)))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/logs`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.LOGS ? "is-selected" : ""
                }, m("span", "История сообщений")))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/bans`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.CHANNELBANS ? "is-selected" : ""
                }, m("span", "Баны на канале")))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/templates`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.TEMPLATES ? "is-selected" : ""
                }, m("span", "Список команд")))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/subAlert`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.SUBALERT ? "is-selected" : ""
                }, m("span", "Оповещения о подписке")))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/autoMessages`,
                    class: vnode.attrs.route == routes.AUTOMESSAGES ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", "Автосообщения")))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/songrequests`,
                    class: vnode.attrs.route == routes.SONGREQUESTS ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", "Сонгреквесты")))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/subdays`,
                    class: vnode.attrs.route == routes.SUBDAY ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", "Сабдни")))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/subs`,
                    class: vnode.attrs.route == routes.SUBSCRIPTIONS ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", "Список подписчиков")))
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
                }, m("span", "Внешние сервисы")))
            components.push(
                m("a", {
                    href: `/channel/${m.route.param("channel")}/subtrain`,
                    class: vnode.attrs.route == routes.SUBTRAIN ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", "Сабтрейн")))
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