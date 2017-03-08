var m = require("mithril")
var model = require("../models/show")
var historyItem = require("./historyItem")
require("../../../scss/modules/_template-show.scss")
var input = require("../../basicWidgets/components/InputComponent")
module.exports = {
    view(vnode) {
        return m(".template-show", [
            m(".template-show__header", `Просмотр команды ${model.template.commandName} на канале ${model.channel}`),
            model.template.aliasTo != "" && model.template.commandName != model.template.aliasTo ? m(".template-show__subheader", `Синоним команды ${model.template.aliasTo}`) : m(".nothing"),
            model.template.aliasTo != "" && model.template.commandName != model.template.aliasTo ? m("a", {
                oncreate: m.route.link,
                href: `/channel/${model.template.channelID}/templates/${model.template.aliasTo}`
            }, m("button", "Перейти к оригиналу")) : m(".nothing"),
            m(input, {
                label: "Тело комманды",
                id: "newCommand",
                error: model.errorTemplate ? "Некорректный шаблон" : null,
                getValue: () => {
                    return model.template.template
                },
                setValue: (value) => {
                    model.template.template = value.trim()
                }
            }),
            m("button", {
                type: "button",
                onclick: () => {
                    model.save()
                }
            }, "Сохранить"),
            m("button", {
                type: "button",
                onclick: () => {
                    model.template.template = ""
                    model.save()
                }
            }, "Удалить команду"),
            m(input, {
                label: "Синоним на команду",
                id: "newCommand",
                getValue: () => {
                    return model.template.aliasTo
                },
                setValue: (value) => {
                    model.template.aliasTo = value.trim()
                }
            }),
            m("button", {
                type: "button",
                onclick: () => {
                    model.setAliasTo()
                }
            }, "Сохранить"), !!model.template.history ? m(".template-show__header", "История команд") : m(".nothing"), !!model.template.history ? m(".template-show__history", model.template.history.map(f => m(historyItem, f))) : m(".nothing")
        ])
    }
}