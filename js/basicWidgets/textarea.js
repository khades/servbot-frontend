import m from 'mithril';
import '../../scss/modules/_controlGroup.scss';

function generateClass(vnode) {
    var classes = []
    if (!!vnode.attrs.error && vnode.attrs.error != null) classes.push("has-error")
    if (!!vnode.attrs.class) classes.push(vnode.attrs.class)
    return classes.join(" ")
}

export default {
    view: function (vnode) {
        return m(".control-group", {
            class: generateClass(vnode)
        }, [
            m("label", {
                for: vnode.attrs.id
            }, vnode.attrs.label),
            m("textarea", {
                id: vnode.attrs.id,
                onchange: function (event) {
                    event.redraw = false
                    m.withAttr("value", vnode.attrs.setValue)(event)
                },
                value: vnode.attrs.getValue()
            }), !!vnode.attrs.error && vnode.attrs.error != null ? m("span.help-block", vnode.attrs.error) : null
        ])
    }
};