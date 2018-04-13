var m = require('mithril')
var model = require("../models/model")
var input = require("../../basicWidgets/components/InputComponent")

var l10n = require("../../l10n/l10n")
var check = require("../../basicWidgets/components/CheckBoxComponent")
module.exports = {
    view() {
        var settings = model.songrequestInfo.settings
        return m(".songrequests__settings", [
            m(check, {
                id: "onlySubs",
                getValue: () => model.songrequestInfo.settings.onlySubs,
                setValue: value => {

                    model.songrequestInfo.settings.onlySubs = value
                },
                label: l10n.get("Ток сабы :3")
            }),
            m(input, {
                label: l10n.get("Длина плейлиста"),
                id: "playlistLength",
                getValue: () => {
                    return model.songrequestInfo.settings.playlistLength
                },
                setValue: (value) => {
                    console.log(value)
                    console.log(value.trim())
                    model.songrequestInfo.settings.playlistLength = parseInt(value.trim())
                    m.redraw()

                }
            }),
            m(input, {
                label: l10n.get("Максимальная длительность видео в секундах"),
                id: "playlistLength",
                getValue: () => {
                    return model.songrequestInfo.settings.maxVideoLength
                },
                setValue: (value) => {
                    model.songrequestInfo.settings.maxVideoLength = parseInt(value.trim())
                    m.redraw()

                }
            }),
            m(input, {
                label: l10n.get("Максимальное количество заказов на пользователя"),
                id: "maxRequestsPerUser",
                getValue: () => {
                    return model.songrequestInfo.settings.maxRequestsPerUser
                },
                setValue: (value) => {
                    model.songrequestInfo.settings.maxRequestsPerUser = parseInt(value.trim())
                    m.redraw()

                }
            }),
            m(input, {
                label: l10n.get("Минимальное количество просмотров"),
                id: "videoViewLimit",
                getValue: () => {
                    return model.songrequestInfo.settings.videoViewLimit
                },
                setValue: (value) => {
                    model.songrequestInfo.settings.videoViewLimit = parseInt(value.trim())
                    m.redraw()
                }
            }),
            m(check, {
                id: "moreLikes",
                getValue: () => model.songrequestInfo.settings.moreLikes,
                setValue: value => {

                    model.songrequestInfo.settings.moreLikes = value
                },
                label: l10n.get("Больше лайков чем дизлайков")
            }),
            m(check, {
                id: "allowOffline",
                getValue: () => model.songrequestInfo.settings.allowOffline,
                setValue: value => {

                    model.songrequestInfo.settings.allowOffline = value
                },
                label: l10n.get("Разрешить заказы оффлайн")
            }),
            m(check, {
                id: "skipIfTagged",
                getValue: () => model.songrequestInfo.settings.skipIfTagged,
                setValue: value => {

                    model.songrequestInfo.settings.skipIfTagged = value
                },
                label: l10n.get("Скипнуть если добавлен забаненый трек")
            }),
            m("button", {
                type: "button",
                onclick() {
                    model.saveSettings()
                }
            }, l10n.get("SAVE"))
        ])
    }

}