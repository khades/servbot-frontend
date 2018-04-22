import m from 'mithril';
import '../../scss/modules/_controlGroup.scss';

export default {
  view: function (vnode) {
    return m(".control-group", [
      m("label", {
        for: vnode.attrs.id,
        class: !!vnode.attrs.error && vnode.attrs.error != null ? "has-error" : ""
      }, vnode.attrs.label),
      m("select", {
        id: vnode.attrs.id,
        onchange: m.withAttr("value", vnode.attrs.setValue)
      }, (!!vnode.attrs.getOptions) ? vnode.attrs.getOptions().map(function (option) {
        return m("option", {
          value: option.value,
          selected: (!!vnode.attrs.getValue && vnode.attrs.getValue() == option.value)
        }, !!option.label && option.label != "" ? option.label : option.value)
      }) : [])
    ])
  }
}