var m = require("mithril")
require('../../scss/modules/_template-list.scss')
var model = require('./models/list')
var TemplateListItemComponent = require("./components/TemplateListItemComponent")
var input = require("../basicWidgets/components/InputComponent")
var channelName = require("../utils/channelName")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")
var l10n = require("../l10n/l10n")

module.exports = {

    oninit: function (vnode) {
        vnode.state.tab = "list"
        model.showAll = false
        vnode.state.route = m.route.get()
        model.init(m.route.param("channel"))
    },
    onupdate: function (vnode) {
        if (vnode.state.route == m.route.get())
            return
        vnode.state.tab = "list"
        vnode.state.route = m.route.get()
        model.init(m.route.param("channel"))
    },
    route: routes.TEMPLATES,
    getTitle: () => {
        return l10n.get("TEMPLATES_TITLE", channelName.get(m.route.param("channel")))
    },
    view: function (vnode) {
        return m(".template-list", [
            m("hgroup.template-list__hgroup", [
                m(".template-list__header", l10n.get("TEMPLATES_TITLE", channelName.get(m.route.param("channel")))),
                m(".template-list__header-buttons", [
                    model.isMod ? m(".template-list__header-button", {
                            class: vnode.state.tab == "list" ? "template-list__header-button--create" : "template-list__header-button--list",
                            onclick: () => {
                                if (vnode.state.tab == "list") {
                                    vnode.state.tab = "create"
                                } else {
                                    vnode.state.tab = "list"
                                }
                            },

                        },
                        vnode.state.tab == "list" ? l10n.get("TEMPLATES_NEW") : l10n.get("TEMPLATES_LIST")) : null,
                    vnode.state.tab == "list" ? m(".template-list__header-button", {
                        onclick: () => {
                            if (model.showAll == true) {
                                model.showAll = false
                            } else {
                                model.showAll = true
                            }
                        },
                    }, model.showAll == true ? l10n.get("TEMPLATES_SHOW_ACTIVE") : l10n.get("TEMPLATES_SHOW_ALL")) : null
                ]),
            ]),

            vnode.state.tab == "list" ? m(".template-list__container", model.getTemplates().map(f => m(TemplateListItemComponent, {
                item: f,
                isMod: model.isMod
            }))) : null,
            model.isMod && vnode.state.tab == "create" ? [
                m(input, {
                    label: l10n.get("TEMPLATES_CREATE_GOTO"),
                    id: "newCommand",
                    getValue: () => {
                        return model.newCommand
                    },
                    setValue: (value) => {
                        model.newCommand = value.trim()
                        m.redraw()
                    }
                }),
                m("a.template-list__goto-command", {
                    oncreate: m.route.link,
                    href: `/channel/${model.channelID}/templates/${model.newCommand}`
                }, m("button", l10n.get("PROCEED"))),
            ] : null


        ])

    }
}