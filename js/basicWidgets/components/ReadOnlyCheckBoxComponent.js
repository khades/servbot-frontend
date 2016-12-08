import * as m from "mithril"


var ReadOnlyCheckBoxComponent = {
  view: function (vnode) {
    return m(".control-group", {
      class: vnode.attrs.value ? "" : "has-error"
    }, m("label", {
      for: vnode.attrs.field,
    }, [
        m("input", {
          id: vnode.attrs.field,
          type: "checkbox",
          checked: vnode.attrs.value,
          disabled: true,
          readonly: true
        }),
        vnode.attrs.label
      ])
    )
  }
}

export default ReadOnlyCheckBoxComponent 
