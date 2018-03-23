var m = require("mithril")
var selector = ".user-bits"
var model = require('../models/userbits')
var channelName = require("../../utils/channelName")
require("../../../scss/modules/_user-bits.scss")
module.exports = {
    oninit: function (vnode) {
        model.get(m.route.param("channel"), m.route.param("user"))
    },
    onupdate: function (vnode) {
        model.get(m.route.param("channel"), m.route.param("user"))
    },
    view(vnode) {
        return m(selector, [
            m(selector + "__header", `История битсов пользователя ${model.result.user} на канале ${channelName.get(model.result.channelID)}`),
            m(selector + "__amount", "Количество битсов: " + model.result.amount),
            model.result.history.map(f => (m(selector + "__history", [
                m(selector + "__date", new Date(f.date).toLocaleString()),
                m(selector + "__history-right", [m(selector + "__reason", f.reason),
                    m(selector + "__change", {
                        class: f.change > 0 ? "user-bits__change--positive" : ""
                    }, f.change)
                ])
            ])))

        ])
    }
}