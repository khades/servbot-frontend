import * as m from "mithril"


var CheckBoxComponent = {
  view: function (vnode) {
    return m(".control-group", m("label", {
      for: vnode.attrs.id,
      class: !!vnode.attrs.error && vnode.attrs.error != null ? "has-error" : ""
    }, [
        m("input", {
          type: "checkbox",
          id: vnode.attrs.id,
          checked: vnode.attrs.value,
          onchange: function (event) {
            event.redraw = false
            m.withAttr("checked", vnode.attrs.onchange)(event)
          }
        }),
        vnode.attrs.label
      ])
    )
  }
}

export default CheckBoxComponent 
