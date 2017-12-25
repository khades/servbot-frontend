var model = require("../models/list")
var m = require("mithril")
var channelName = require("../../utils/channelName")
var input = require("../../basicWidgets/components/InputComponent")
var textarea = require("../../basicWidgets/textarea")
var multiinput = require("../../basicWidgets/multiinput")
var check = require("../../basicWidgets/components/CheckBoxComponent")
var states = require("../../utils/states.js")
require("../../../scss/modules/_subday-list.scss")
module.exports = {
    view: function (vnode) {

        return model.state == states.READY ?
            m(".subday-list", [
                m("h1", `Сабдеи на канале ${channelName.get(model.channelID)}`),
                m(".subday-list__items", model.objects.map(f => {
                    return m(".subday-list__item", [
                        m("a.subday-list__name", {
                            class: f.isActive ? "subday-list__name--is-active" : "",
                            href: `/channel/${f.channelID}/subdays/${f.id}`,
                            oncreate: m.route.link
                        }, f.name),

                        m(".subday-list__date", new Date(f.date).toLocaleString())
                    ])
                }))
            ]) : ""
    }
}