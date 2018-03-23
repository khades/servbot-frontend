var m = require("mithril")
require('../../scss/modules/_template-list.scss')
var model = require('./models/list')
var TemplateListItemComponent = require("./components/TemplateListItemComponent")
var input = require("../basicWidgets/components/InputComponent")
var channelName = require("../utils/channelName")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")

module.exports = {
  
    oninit: function (vnode) {
        vnode.state.route = m.route.get()
        model.init(m.route.param("channel"))
    },
    oncreate: function (vnode) {
        if (vnode.state.route == m.route.get())
            return
        vnode.state.route = m.route.get()
        model.init(m.route.param("channel"))
    },
    route: routes.TEMPLATES,
    getTitle: () => `Кастомные команды для канала ${channelName.get(m.route.param("channel"))}`,
    view: function (vnode) {
        return m(".template-list", [
            m(".template-list__header", `Комманды на канале ${channelName.get(model.channelID)}`),
            m(input, {
                label: "Создание новой команды\\переход к существующей команде",
                id: "newCommand",
                getValue: () => {
                    return model.newCommand
                },
                setValue: (value) => {
                    model.newCommand = value.trim()
                    m.redraw()
                }
            }),

            m("a", {
                oncreate: m.route.link,
                href: `/channel/${model.channelID}/templates/${model.newCommand}`
            }, m("button", "Перейти")),
            m(".template-list__header", `Список существующих комманд`),

            m(".template-list__filter", [
                m("button.template-list__filter__template", {
                    class: model.showTemplate == true ? "" : "disabled",
                    type: "button",
                    onclick: f => {
                        if (model.showTemplate == true)
                            model.showTemplate = false
                        else
                            model.showTemplate = true
                    }

                }, m(".button-content", [m(`span.sprite`), m("span.text", "Команда")])),
                m("button.template-list__filter__alias", {

                    class: model.showAlias == true ? "" : "disabled",
                    type: "button",
                    onclick: f => {
                        if (model.showAlias == true)
                            model.showAlias = false
                        else
                            model.showAlias = true
                    }
                }, m(".button-content", [
                    m(`span.sprite`),
                    m("span.text", "Алиас")
                ])),
                m("button.template-list__filter__deleted", {
                    class: model.showDeleted == true ? "" : "disabled",
                    type: "button",
                    onclick: f => {
                        if (model.showDeleted == true)
                            model.showDeleted = false
                        else
                            model.showDeleted = true
                    }
                }, m(".button-content", [m(`span.sprite-delete-outline`), m(`span.sprite`), m("span.text", "Удалено")]))

            ]),
            m(".template-list__container", model.getTemplates().map(f => m(TemplateListItemComponent, {
                item: f
            })))
        ])
    }
}