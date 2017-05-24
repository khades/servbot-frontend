var m = require("mithril")
var states = require("../../utils/states")
var input = require("../../basicWidgets/components/InputComponent")
var checkbox = require("../../basicWidgets/components/CheckBoxComponent")
require("../../../scss/modules/_external-services.scss")
//          channelID: () => { return model.object.channelID },
//            channel: () => { return model.object.channel },
module.exports = {
    view(vnode) {
        var model = vnode.attrs.model
        return model.state == states.READY ? m(".external-services", [
            m(".external-services__header", `Внешние сервисы на канале ${model.object.channel}`),
            m(".external-services__subheader", "Группа вконтакте"),
            m(input, {
                label: "Имя группы",
                class: "external-services__vk-group-input",

                id: "vkGroupInput",
                getValue: () => {
                    return !!model.object.vkGroupInfo ? model.object.vkGroupInfo.groupName : ""
                },
                setValue: (value) => {
                    !!model.object.vkGroupInfo ? model.object.vkGroupInfo.groupName = value : model.object.vkGroupInfo = {
                        groupName: value
                    }
                }
            }),
            m(checkbox, {
                id: "vkGroupAlertEnabled",
                getValue: () => !!model.object.vkGroupInfo ? model.object.vkGroupInfo.notifyOnChange : false,
                setValue: value => {
                    !!model.object.vkGroupInfo ? model.object.vkGroupInfo.notifyOnChange = value : model.object.vkGroupInfo = {
                        notifyOnChange: value
                    }

                },
                label: "Писать оповещение в чат при новом посте"
            }), !!model.object.vkGroupInfo && !!model.object.vkGroupInfo.lastMessageBody ? [
                m(".external-services__subheader", "Последнее сообщение"),
                m(".external-services__vk-message-body", model.object.vkGroupInfo.lastMessageBody),
            ] : "",
            m('button', {
                onclick: () => {
                    model.saveVK()
                }
            }, "Сохранить"),
        ]) : "loading..."
    }
}