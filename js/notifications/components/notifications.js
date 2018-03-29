var m = require("mithril")
module.exports = {
    view(vnode) {
        return m('.notifications__item', {
            key: vnode.attrs.id,
            id: vnode.attrs.id
        }, vnode.attrs.text)
    }
}