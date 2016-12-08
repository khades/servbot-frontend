var m = require("mithril")

var SelectComponent = {
  view: function (vnode) {
    return m(".control-group", [
      m("label", {
        for: vnode.attrs.id,
        class: !!vnode.attrs.error && vnode.attrs.error != null ? "has-error" : ""
      }, vnode.attrs.label),
      m("select", {
        id: vnode.attrs.id,
        onchange: m.withAttr("value", vnode.attrs.onchange)
      }, (!!vnode.attrs.options) ? vnode.attrs.options.values.map(function (option) {
        return m("option", {
          value: option,
          selected: (!!vnode.attrs.value && vnode.attrs.value == option)
        }, vnode.attrs.options[option])
      }) : [])
    ])
  }
}

module.exports = SelectComponent 
