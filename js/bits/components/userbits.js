var m = require("mithril")
var selector = ".user_bits"
var model = require('../models/userbits')
var channelName = require("../../utils/channelName")
require("../../../scss/modules/_bits.scss")
module.exports = {
    view(vnode) {
        return m(selector, [
            m(selector + "__header", `История битсов пользователя ${model.result.user} на канале ${channelName.get(model.result.channelID)}`),

            m(selector + "__user", model.result.user),
            m(selector + "__amount", model.result.amount),
            JSON.stringify(model.result)
        ])
    }
}