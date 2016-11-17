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

            m("li", {
                class: vnode.attrs.route == "channelDataAdd" ? "is-selected" : ""
            },
                m("a", {
                    href: "/channelData/add",
                    oncreate: m.route.link
                }, m("span", "Добавить событие"))
            ),
            m("li", {
                class: vnode.attrs.route == "myChannel" ? "is-selected" : ""
            },
                m("a", {
                    href: "/channelData",
                    oncreate: m.route.link
                }, m("span", m("span", "Мой Канал")))
            ),

            m("li", {
                class: vnode.attrs.route == "personalInfo" ? "is-selected" : ""
            },
                m("a", {
                    href: "/personalInfo",
                    oncreate: m.route.link
                }, "Личный кабинет")
            )
        ])
        )
    }
}

module.exports = MenuComponent