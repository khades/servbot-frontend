var m = require("mithril")
var selector = ".bits"
var model = require("../models/bits")
require("../../../scss/modules/_bits.scss")
module.exports = {
    view(vnode) {
        return m(selector, [
            m(selector + "__header", "Список людей, поддержавших канал"),
            m(selector + "__users", model.result.map(f => m("a"+selector + "__bits-record", {
                href: `/channel/${m.route.param("channel")}/bits/${f.userID}`,
                oncreate: m.route.link
            },[
                m(selector + "__user", f.user),
                m(selector + "__amount", f.amount),
            ])))
        ])
    }
}