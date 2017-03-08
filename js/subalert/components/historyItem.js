var m = require("mithril")
require("../../../scss/modules/_subalert-history.scss")
module.exports = {
    view(vnode) {
        return m(".subalert-history", [
            m(".subalert-history__user", [
                `${vnode.attrs.user}`,
                m(".subalert-history__user__tooltip", `${vnode.attrs.user}#${vnode.attrs.userID}`)
            ]),
            m(".subalert-history__date", new Date(vnode.attrs.date).toLocaleString()),
            m(".subalert-history__sub-message", vnode.attrs.subMessage),
            m(".subalert-history__resub-message", vnode.attrs.resubMessage),
            m(".subalert-history__repeat-body", vnode.attrs.repeatBody)

        ])
    }
}