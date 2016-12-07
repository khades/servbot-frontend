import * as m from "mithril"
import * as Hammer from "hammerjs"

var MenuComponent = {
    oncreate: function (vnode) {
        new Hammer(vnode.dom).on("swipeleft", function (ev) {
            vnode.attrs.hideMenu()
            m.redraw()
        })
        new Hammer(vnode.dom).on("swiperight", function (ev) {
            vnode.attrs.showMenu()
            m.redraw()
        })
    },

    view: function (vnode) {
        return m(".site-menu", m("ul", [
            m("li", {
                class: vnode.attrs.route == "mainPage" ? "is-selected" : ""
            },
                m("a", {
                    href: "/",
                    oncreate: m.route.link
                }, m("span", "Главная страница"))),
        ])
        )
    }
}

export default MenuComponent 