var m = require("mithril")
require("../../../scss/modules/_controlGroup.scss")
var CheckBoxComponent = {
  view: function (vnode) {
    return m(".control-group", m("label", {
      for: vnode.attrs.id,
      class: !!vnode.attrs.error && vnode.attrs.error != null ? "has-error" : ""
    }, [
        m("input", {
          type: "checkbox",
          id: vnode.attrs.id,
          checked: vnode.attrs.getValue(),
          onchange: function (event) {
            event.redraw = false
            m.withAttr("checked", vnode.attrs.setValue)(event)
          }
        }),
        vnode.attrs.label
      ])
    )
  }
}

module.exports = CheckBoxComponent 
