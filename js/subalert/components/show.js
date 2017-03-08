var m = require("mithril")
var model = require("../models/show")
var historyItem = require("./historyItem")
require("../../../scss/modules/_subalert-show.scss")
var input = require("../../basicWidgets/components/InputComponent")
module.exports = {
    view(vnode) {
        return m(".subalert-show", [
            m(".subalert-show__header", `Сабалерт на канале ${model.channel}`),

            m(input, {
                label: "Сообщение при подписке",
                id: "subMessage",
                getValue: () => {
                    return model.subAlert.subMessage
                },
                setValue: (value) => {
                    model.subAlert.subMessage = value.trim()
                }
            }),
            m(input, {
                label: "Сообщение при переподписке",
                id: "resubMessage",
                error: model.errorResubAlert ? "Некорректный шаблон" : null,
                getValue: () => {
                    return model.subAlert.resubMessage
                },
                setValue: (value) => {
                    model.subAlert.resubMessage = value.trim()
                }
            }),
            m(input, {
                label: "Повторяющееся тело сообщения переподписки",
                id: "repeatBody",
                getValue: () => {
                    return model.subAlert.repeatBody
                },
                setValue: (value) => {
                    model.subAlert.repeatBody = value.trim()
                }
            }),
            m("button", {
                type: "button",
                onclick: () => {
                    model.save()
                }
            }, "Сохранить"),

            m(".subalert-show__header", "История команд"),
            !!model.subAlert.history ? m(".subalert-show__history", model.subAlert.history.map(f => m(historyItem, f))) :m(".nothing")
        ])
    }
}