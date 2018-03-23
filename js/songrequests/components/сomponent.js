var m = require("mithril")
var model = require("../models/model")
require("../../../scss/modules/_songrequests.scss")
var states = require("../../utils/states")
var songrequestsItem = require("./songrequestsItem")
var channelName = require("../../utils/channelName")

module.exports = {
    oninit: function (vnode) {
        model.get(m.route.param("channel"))
        vnode.state.route = m.route.get()
    },
    onupdate: function (vnode) {
        if (vnode.state.route != m.route.get()) {
            model.get(m.route.param("channel"))
        }
    },
    view(vnode) {
        return model.songrequestInfo != null ? m(".songrequests", [
            m("h1", `Сонгреквесты на канале ${channelName.get(model.channelID)}`),
            m(".songrequests__container", [
                m(".songrequests__player"),
                m(".songrequests__requests", model.songrequestInfo.requests.map(f => m(songrequestsItem, {
                    item: f,
                    isMod: model.songrequestInfo.isMod,
                    isOwner: model.songrequestInfo.isOwner
                })))
            ])
        ]) : null
    }
}