var model = require("../models/model")
var m = require("mithril")
var channelName = require("../../utils/channelName")
var input = require("../../basicWidgets/components/InputComponent")
var textarea = require("../../basicWidgets/textarea")
var multiinput = require("../../basicWidgets/multiinput")
var check = require("../../basicWidgets/components/CheckBoxComponent")
var states = require("../../utils/states.js")
require("../../../scss/modules/_subtrain.scss")
module.exports =  {
    view: function (vnode) {
       
        return model.state == states.READY ? 
        m(".subtrain", [
            m("h1",`Сабтрейн на канале ${channelName.get(model.channelID)}`),
            m(check, {
                id: "enabled",
                getValue: () => model.object.enabled,
                setValue: value => {

                    model.object.enabled = value
                },
                label: "Сабтрейн включён"
            }),
            m("", `Следующее уведомление : ${new Date(model.object.notificationTime).toLocaleString()}`),
            m("", `Конец текущего сабтрейна : ${new Date(model.object.expirationTime).toLocaleString()}`),
            m("", `Размер сабтрейна : ${model.object.сurrentStreak}`),
            
            m(input, {
                label: "Время истечения сабтрейна",
                id: "expirationLimit",

                getValue: () => {
                    return model.object.expirationLimit
                },
                setValue: (value) => {
                    model.object.expirationLimit = parseInt(value)
                }
            }),
            m(input, {
                label: "Время посылки уведомления конца сабтрейна",
                id: "notificationLimit",

                getValue: () => {
                    return model.object.notificationLimit
                },
                setValue: (value) => {
                    model.object.notificationLimit = parseInt(value)
                }
            }),
            m(input, {
                label: "Добавочное сообщение при подписке",
                id: "appendTemplate",

                getValue: () => {
                    return model.object.appendTemplate
                },
                setValue: (value) => {
                    model.object.appendTemplate = value
                }
            }),
            m(input, {
                label: "Уведомление о закрытии сабтрейна",
                id: "notificationTemplate",

                getValue: () => {
                    return model.object.notificationTemplate
                },
                setValue: (value) => {
                    model.object.notificationTemplate = value
                }
            }),
            m(input, {
                label: "Уведомление о конце сабтрейна",
                id: "appendTemplate",

                getValue: () => {
                    return model.object.timeoutTemplate
                },
                setValue: (value) => {
                    model.object.timeoutTemplate = value
                }
            }),
            m("button", {
                type:"button",
                onclick: () => {
                    model.save()
                }
            }, "Сохранить")
        ]): ""
    }
}