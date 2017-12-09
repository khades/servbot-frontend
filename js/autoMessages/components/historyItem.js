var m = require("mithril")
require("../../../scss/modules/_automessage-history.scss")

module.exports = {
    view(vnode) {
        return m(".automessage-history", [
            m(".automessage-history__line", [
                m(".automessage-history__user", [
                    vnode.attrs.user,
                    m(".automessage-history__user__tooltip", `${vnode.attrs.user}#${vnode.attrs.userID}`),

                ]),
                m(".automessage-history__date", new Date(vnode.attrs.date).toLocaleString())
            ]),
            m(".automessage-history__line", [
                m(".automessage-history__duration-limit", vnode.attrs.durationLimit / 1000000000),
                m(".automessage-history__message-limit", vnode.attrs.messageLimit),
            ]),
            m(".automessage-history__message", vnode.attrs.message), 
            !!vnode.attrs.game && vnode.attrs.game != "" ? m(".automessage-history__game", vnode.attrs.game) : null
        ])
    }
}