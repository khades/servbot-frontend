var m = require("mithril")

var MenuComponent = {

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

module.exports = MenuComponent