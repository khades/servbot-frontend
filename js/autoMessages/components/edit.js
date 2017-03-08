var m = require("mithril")
var model = require("../models/edit")
var input = require("../../basicWidgets/components/InputComponent")
var historyItem = require("./historyItem")
require("../../../scss/modules/_automessage-edit.scss")

module.exports = {
    view(vnode) {
        return m(".automessage-edit", [
            model.isNew() == false ? m(".automessage-edit__header", "Информация о автосообщении") : m(".nothing"),
            model.isNew() == false ? m(".automessage-edit__stats", [
                m(".automessage-edit__stats__messagethreshold", `Сообщений до следующего срабатывания: ${model.object.messageThreshold}`),
                m(".automessage-edit__stats__datethreshold", `Время следующего срабатывания: ${ new Date(model.object.durationThreshold).toLocaleString()}`),

            ]) : m(".nothing"),
            model.isNew() == false ? m(".automessage-edit__header", "Редактирование автосообщения") : m(".automessage-edit__header", "Создание автосообщения"),

            m(input, {
                label: "Текст сообщения",
                id: "message",
                class: "automessage-edit__message",
                getValue: () => {
                    return model.object.message
                },
                setValue: (value) => {
                    model.object.message = value
                }
            }),
            m(input, {
                label: "Период сообщений перед рассылкой",
                id: "messageLimit",
                class: "automessage-edit__message-limit",
                getValue: () => {
                    return model.object.messageLimit
                },
                setValue: (value) => {
                    model.object.messageLimit = parseInt(value)
                }
            }),
            m(input, {
                label: "Период времени перед рассылкой, в секундах",
                id: "durationLimit",
                class: "automessage-edit__duration-limit",

                getValue: () => {
                    return model.object.durationLimit
                },
                setValue: (value) => {
                    model.object.durationLimit = parseInt(value)
                }
            }), m("button", {
                onclick: () => {
                    model.push()
                }
            }, "Сохранить"),
            model.isNew() == false ? m(".automessage-edit__header", "История автосообщений") : m(".nothing"),
            model.isNew() == false ? m(".automessage-edit__history", model.object.history.map(f => m(historyItem, f))) : m(".nothing")


        ])
    }
}