var m = require("mithril")

var InputComponent = {
  view: function (vnode) {

    return m(".control-group", {
      class: !!vnode.attrs.error && vnode.attrs.error != null ? "has-error" : ""
    }, [
        m("label", {
          for: vnode.attrs.id
        }, vnode.attrs.label),
        m("input", {
          id: vnode.attrs.id,
          type: "text",
          onchange: function (event) {
            event.redraw = false
            m.withAttr("value", vnode.attrs.onchange)(event)
          },
          value: vnode.attrs.value
        }), !!vnode.attrs.error && vnode.attrs.error != null ? m("span.help-block", vnode.attrs.error) : null
      ])
  }
}

module.exports = InputComponent
