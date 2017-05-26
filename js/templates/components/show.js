var m = require("mithril")
var model = require("../models/show")
var historyItem = require("./historyItem")
require("../../../scss/modules/_template-show.scss")
var input = require("../../basicWidgets/components/InputComponent")
var textarea = require("../../basicWidgets/textarea")
var multiinput = require("../../basicWidgets/multiinput")
var check = require("../../basicWidgets/components/CheckBoxComponent")
var states = require("../../utils/states.js")
module.exports = {
    view(vnode) {
        console.log(model.template)
        return model.state == states.READY ? m(".template-show", [
            m(".template-show__header", `Просмотр команды ${model.template.commandName} на канале ${model.channel}`), !!model.template.aliasTo && model.template.aliasTo != "" && model.template.commandName != model.template.aliasTo ? m(".template-show__subheader", `Синоним команды ${model.template.aliasTo}`) : "", !!model.template.aliasTo && model.template.aliasTo != "" && model.template.commandName != model.template.aliasTo ? m("a", {
                oncreate: m.route.link,
                href: `/channel/${model.template.channelID}/templates/${model.template.aliasTo}`
            }, m("button", "Перейти к оригиналу")) : "",
            m(check, {
                id: "showOnline",
                getValue: () => model.template.showOnline,
                setValue: value => {

                    model.template.showOnline = value
                },
                label: "Показывать во время стрима"
            }),
            m(check, {
                id: "showOffline",
                getValue: () => model.template.showOffline,
                setValue: value => {

                    model.template.showOffline = value
                },
                label: "Показывать вне стрима"
            }),
            m(check, {
                id: "PreventDebounce",
                getValue: () => model.template.preventDebounce,
                setValue: value => {

                    model.template.preventDebounce = value
                },
                label: "Игнорировать дебаунсер"
            }),
            m(check, {
                id: "EnableStringRandomizer",
                getValue: () => model.template.stringRandomizer.enabled,
                setValue: value => {

                    model.template.stringRandomizer.enabled = value
                    m.redraw()
                },
                label: "Включить рандомизатор строк"
            }), !!model.template.stringRandomizer && model.template.stringRandomizer.enabled == true ? m(multiinput, {
                getValues: () => model.template.stringRandomizer.strings,
                setValues: (values) => model.template.stringRandomizer.strings = values,
                id: "randomizerStrings"
            }) : "",
            m(check, {
                id: "EnableIntegerRandomizer",
                getValue: () => model.template.integerRandomizer.enabled,
                setValue: value => {

                    model.template.integerRandomizer.enabled = value
                    m.redraw()
                },
                label: "Включить рандомизатор чисел"
            }), !!model.template.integerRandomizer && model.template.integerRandomizer.enabled == true ? [m(input, {
                    label: "Нижний предел рандомизатора чисел",
                    id: "integerLowerRange",

                    getValue: () => {
                        return model.template.integerRandomizer.lowerLimit
                    },
                    setValue: (value) => {
                        model.template.integerRandomizer.lowerLimit = parseInt(value)
                    }
                }),
                m(input, {
                    label: "Верхний предел рандомизатора чисел",
                    id: "integerUpperRange",
                    getValue: () => {
                        return model.template.integerRandomizer.upperLimit
                    },
                    setValue: (value) => {
                        model.template.integerRandomizer.upperLimit = parseInt(value)
                    }
                })
            ] : "",
            m(textarea, {
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
            }, "Сохранить"), !!model.template.history ? m(".template-show__header", "История команд") : "", !!model.template.history ? m(".template-show__history", model.template.history.map(f => m(historyItem, f))) : ""
        ]) : ""
    }
}