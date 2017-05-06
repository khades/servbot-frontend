var m = require("mithril")
// var Hammer = require("hammerjs")
require("../../../scss/modules/_site-menu.scss")
var routes = require("../routes")
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
        if (!!vnode.attrs.channel && !!vnode.attrs.channelID) {
            components.push(
                m("a.site-menu--channel-link", {
                    href: `/channel/${vnode.attrs.channelID()}`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.CHANNEL ? "is-selected" : ""
                }, m("span", `Канал ${vnode.attrs.channel()}`)))
            components.push(
                m("a", {
                    href: `/channel/${vnode.attrs.channelID()}/logs`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.LOGS ? "is-selected" : ""
                }, m("span", "История сообщений")))
            components.push(
                m("a", {
                    href: `/channel/${vnode.attrs.channelID()}/templates`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.TEMPLATES ? "is-selected" : ""
                }, m("span", "Список команд")))
            components.push(
                m("a", {
                    href: `/channel/${vnode.attrs.channelID()}/subAlert`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.SUBALERT ? "is-selected" : ""
                }, m("span", "Оповещения о подписке")))
            components.push(
                m("a", {
                    href: `/channel/${vnode.attrs.channelID()}/autoMessages`,
                    class: vnode.attrs.route == routes.AUTOMESSAGES ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", "Автосообщения")))
            components.push(
                m("a", {
                    href: `/channel/${vnode.attrs.channelID()}/subs`,
                    class: vnode.attrs.route == routes.SUBSCRIPTIONS ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", "Список подписчиков")))
            components.push(
                m("a", {
                    href: `/channel/${vnode.attrs.channelID()}/bits`,
                    class: vnode.attrs.route == routes.BITS ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", "Битсы")))
        }
        return m(".site-menu", components)
    }
}

module.exports = MenuComponent