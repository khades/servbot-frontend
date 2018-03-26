var model = require("./models/model")
var m = require("mithril")
var channelName = require("../utils/channelName")
var input = require("../basicWidgets/components/InputComponent")
var textarea = require("../basicWidgets/textarea")
var multiinput = require("../basicWidgets/multiinput")
var check = require("../basicWidgets/components/CheckBoxComponent")
var states = require("../utils/states.js")
var routes = require("../pageTemplate/routes")
var loading = require("../basic/loading")
var l10n = require("../l10n/l10n")
require("../../scss/modules/_subtrain.scss")
module.exports = {

    oninit: function (vnode) {
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"))

    },

    onupdate: function (vnode) {
        if (vnode.state.route == m.route.get())
            return
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"))

    },

    route: routes.SUBTRAIN,

    getTitle() {
        return l10n.get("SUBTRAIN_TITLE", channelName.get(m.route.param("channel")))

    },

    view: function (vnode) {
        if (model.state == states.LOADING) {
            return m(loading)
        }
        return m(".subtrain", [
            m("h1", l10n.get("SUBTRAIN_TITLE", channelName.get(m.route.param("channel")))),
            m(check, {
                id: "enabled",
                getValue: () => model.object.enabled,
                setValue: value => {

                    model.object.enabled = value
                },
                label: l10n.get("SUBTRAIN_ENABLED")
            }),
            m(check, {
                id: "onlyNewSubs",
                getValue: () => model.object.onlyNewSubs,
                setValue: value => {

                    model.object.onlyNewSubs = value
                },
                label: l10n.get("SUBTRAIN_COUNT_ONLY_NEW_SUBS")
            }),
            m("", l10n.get("SUBTRAIN_NEXT_NOTIFICATION", new Date(model.object.notificationTime).toLocaleString())),
            m("", l10n.get("SUBTRAIN_END_TIME", new Date(model.object.expirationTime).toLocaleString())),
            m("", l10n.get("SUBTRAIN_SIZE", model.object.сurrentStreak)),
            m("", l10n.get("SUBTRAIN_PARTICIPANTS", !!model.object.users ? model.object.users.join(", ") : "")),
            m(input, {
                label: l10n.get("SUBTRAIN_EXPIRATION_DURATION"),
                id: "expirationLimit",

                getValue: () => {
                    return model.object.expirationLimit
                },
                setValue: (value) => {
                    model.object.expirationLimit = parseInt(value)
                }
            }),
            m(input, {
                label: l10n.get("SUBTRAIN_NOTIFICATION_DURATION"),
                id: "notificationLimit",

                getValue: () => {
                    return model.object.notificationLimit
                },
                setValue: (value) => {
                    model.object.notificationLimit = parseInt(value)
                }
            }),
            m("div", l10n.get("SUBTRAIN_CHANGE_WARNING")),
            m(input, {
                label: l10n.get("SUBTRAIN_ADDITIONAL_SUBMESSAGE"),
                id: "appendTemplate",

                getValue: () => {
                    return model.object.appendTemplate
                },
                setValue: (value) => {
                    model.object.appendTemplate = value
                }
            }),
            m(input, {
                label: l10n.get("SUBTRAIN_NOTIFICAION_BODY"),
                id: "notificationTemplate",

                getValue: () => {
                    return model.object.notificationTemplate
                },
                setValue: (value) => {
                    model.object.notificationTemplate = value
                }
            }),
            m(input, {
                label: l10n.get("SUBTRAIN_EXPIRATION_BODY"),
                id: "appendTemplate",

                getValue: () => {
                    return model.object.timeoutTemplate
                },
                setValue: (value) => {
                    model.object.timeoutTemplate = value
                }
            }),
            m("button", {
                type: "button",
                onclick: () => {
                    model.save()
                }
            }, l10n.get("SAVE"))
        ])
    }
}