var m = require("mithril")
var model = require("./models/edit")
var input = require("../basicWidgets/components/InputComponent")
var historyItem = require("./components/historyItem")
require("../../scss/modules/_automessage-edit.scss")
var routes = require("../pageTemplate/routes")
var l10n = require("../l10n/l10n")

module.exports = {
    oninit: function (vnode) {
        vnode.state.route = m.route.get()
        if (!!m.route.param("id")) {
            model.get(m.route.param("channel"), m.route.param("id"))
        } else {
            model.new(m.route.param("channel"))
        }

    },

    oncreate: function (vnode) {
        if (vnode.state.route == m.route.get())
            return
        vnode.state.route = m.route.get()
        if (!!m.route.param("id")) {
            model.get(m.route.param("channel"), m.route.param("id"))
        } else {
            model.new(m.route.param("channel"))
        }
    },
    route: routes.AUTOMESSAGES,
    getTitle() {
        if (!!m.route.param("id")) {
            return l10n.get("AUTOMESSAGES_EDITING", m.route.param("id"))
        } else {
            return l10n.get("AUTOMESSAGES_CREATION")
        }
    },
    view(vnode) {
        return m(".automessage-edit", [

            model.isNew == false ? m(".automessage-edit__header", l10n.get("AUTOMESSAGES_INFORMATION")) : "",
            model.isNew == false ? m(".automessage-edit__stats", [
                m(".automessage-edit__stats__messagethreshold", l10n.get("AUTOMESSAGES_NEXT_MESSAGETHRESHOLD", model.object.messageThreshold < 0 ? "0" : model.object.messageThreshold)),
                m(".automessage-edit__stats__datethreshold", l10n.get("AUTOMESSAGES_NEXT_DURATIONTHRESHOLD", new Date(model.object.durationThreshold).toLocaleString())),
            ]) : "",
            m(".automessage-edit__header", l10n.get("AUTOMESSAGES_SETTINGS")),

            m(input, {
                label: l10n.get("AUTOMESSAGES_BODY"),
                id: "message",
                class: "automessage-edit__message",
                getValue: () => {
                    return model.object.message
                },
                setValue: (value) => {
                    model.object.message = value
                },
                getError: () => {
                    return model.isValid == false && model.isNew == true ? l10n.get("VAL_NOT_EMPTY") : null
                }
            }),
            m(input, {
                label: l10n.get("AUTOMESSAGES_MESSAGE_THRESHOLD"),
                id: "messageLimit",
                class: "automessage-edit__message-limit",
                getValue: () => {
                    return model.object.messageLimit
                },
                setValue: (value) => {
                    model.object.messageLimit = parseInt(value)
                },
                getError: () => {
                    return model.isValid == false ? l10n.get("VAL_INT_MIN", "20") : null
                }
            }),
            m(input, {
                label: l10n.get("AUTOMESSAGES_DURATION_THRESHOLD"),
                id: "durationLimit",
                class: "automessage-edit__duration-limit",

                getValue: () => {
                    return model.object.durationLimit
                },
                setValue: (value) => {
                    model.object.durationLimit = parseInt(value)
                },
                getError: () => {
                    return model.isValid == false ? l10n.get("VAL_INT_MIN", "60") : null
                }
            }),
            m(input, {
                label: l10n.get("AUTOMESSAGES_SEND_DURING_GAME"),
                id: "game",
                class: "automessage-edit__game",

                getValue: () => {
                    return model.object.game
                },
                setValue: (value) => {
                    model.object.game = value.trim()
                }
            }),
            m("button", {
                onclick: () => {
                    model.push()
                }
            }, l10n.get("SAVE")),
            model.isNew == false ? m(".automessage-edit__header", l10n.get("AUTOMESSAGES_EDIT_HISTORY")) : "",
            model.isNew == false && !!model.object.history ? m(".automessage-edit__history", model.object.history.map(f => m(historyItem, f))) : ""
        ])
    }
}