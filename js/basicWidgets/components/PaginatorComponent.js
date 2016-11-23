var m = require("mithril")
var range = require("lodash/range")
var PaginatorComponent = {
    view: function (vnode) {
        //     function generateButtons() {
        vnode.attrs.range = 2

        var pages = range(2 * vnode.attrs.range + 1)
            .map(f => vnode.attrs.getPage() - vnode.attrs.range + f)
            .filter(f => f > 0 && f < vnode.attrs.pages + 1)
        var buttons = [
            m("div.paginator__item", {
                onclick: event => {
                    event.redraw = false
                    if (vnode.attrs.getPage() != 1)
                        vnode.attrs.setPage(1)
                },
                class: vnode.attrs.getPage() == 1 ? "paginator__item__selected" : ""
            }, m("div.paginator__item__content", "❮❮")),
            m("div.paginator__item", {
                onclick: event => {
                    event.redraw = false

                    if (vnode.attrs.getPage() != 1) {
                        vnode.attrs.setPage(vnode.attrs.getPage() - 1)
                    }
                },
                class: vnode.attrs.getPage() == 1 ? "paginator__item__inactive" : ""

            }, m("div.paginator__item__content", "❮")),
        ]

        pages.forEach(f => {
            buttons.push(m("div.paginator__item", {
                onclick: event => {
                    event.redraw = false

                    if (vnode.attrs.getPage() != f) {
                        vnode.attrs.setPage(f)
                    }
                },
                class: vnode.attrs.getPage() == f ? "paginator__item__selected" : ""

            }, m("div.paginator__item__content", f)))
        })
        buttons.push(m("div.paginator__item", {
                onclick: event => {
                    event.redraw = false

                    if (vnode.attrs.getPage() != vnode.attrs.pages) {
                        vnode.attrs.setPage(vnode.attrs.getPage() + 1)
                    }
                },
                class: vnode.attrs.getPage() == vnode.attrs.pages ? "paginator__item__inactive" : ""

            }, m("div.paginator__item__content", "❯")),
            m("div.paginator__item", {
                onclick: event => {
                    event.redraw = false

                    if (vnode.attrs.getPage() != vnode.attrs.pages)
                        vnode.attrs.setPage(vnode.attrs.pages)
                },
                class: vnode.attrs.getPage() == vnode.attrs.pages ? "paginator__item__selected" : ""

            }, m("div.paginator__item__content", "❯❯")))

        return m(".paginator", buttons)
            // }
            // return m(".paginator", [
            //     generateButtons()
            // ])
    }
}

module.exports = PaginatorComponent