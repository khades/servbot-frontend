var model = require("../models/model")
var m = require("mithril")
var channelName = require("../../utils/channelName")
var input = require("../../basicWidgets/components/InputComponent")
var textarea = require("../../basicWidgets/textarea")
var multiinput = require("../../basicWidgets/multiinput")
var check = require("../../basicWidgets/components/CheckBoxComponent")
var states = require("../../utils/states.js")
require("../../../scss/modules/_channel-bans.scss")
module.exports = {
    view: function (vnode) {

        return model.state == states.READY ?
            m(".channel-bans", [
                m("h1", `Баны на канале ${channelName.get(model.channelID)}`),
                m(".channel-bans__items", model.object.bans.map(f => {
                    return m(".channel-bans__item", [
                        m(".channel-bans__name", f.user + " - " + (f.banLength == 0 ? "Перманентно" : f.banLength + " Секунд")),

                        m(".channel-bans__date", new Date(f.date).toLocaleString())
                    ])
                }))
            ]) : ""
    }
}