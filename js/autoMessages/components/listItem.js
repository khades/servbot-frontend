var m = require("mithril")
var model = require("../models/list")

module.exports = {
    view(vnode) {
        return m("a.automessage-list__item", {
            oncreate: m.route.link,
            href: `/channel/${vnode.attrs.channelID}/autoMessages/${vnode.attrs.id}`
            
        }, [
                m(".automessage-list__item__message", vnode.attrs.message),
                m(".automessage-list__item__message-limit", vnode.attrs.messageThreshold < 0 ? `0/${vnode.attrs.messageLimit}` : `${vnode.attrs.messageThreshold}/${vnode.attrs.messageThreshold}`),
                m(".automessage-list__item__duration-limit", `${new Date(vnode.attrs.durationThreshold).toLocaleString()} (${vnode.attrs.durationLimit/1000000000})`)
            ]
        )
    }
}