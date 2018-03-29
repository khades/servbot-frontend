var m = require("mithril")
var l10n = require("../l10n/l10n")
require("../../scss/modules/_multiinput.scss")
module.exports = {
    view(vnode) {

        var values = vnode.attrs.getValues()
        if (!(!!values)) {
            values = []
        }

        return m(".multiinput", [
            values.length > 0 ? values.map(
                (value, index) => m(".multiinput__row", [
                    m("input", {
                        id: vnode.attrs.id + "." + index,
                        value: value,
                        onchange: event => {
                            event.redraw = false
                            m.withAttr("value", function (value) {
                                values[index] = value

                            })(event)
                        },
                    }), m(".multiinput__remove", {
                        onclick: () => {
                            values.splice(index, 1)
                        }
                    }, l10n.get("DELETE"))
                ])
            ) : "",
            m("button.btn.btn-success", {
                    type: "button",
                    onclick: event => {
                        values.push("")
                        vnode.attrs.setValues(values)
                    }
                },
                l10n.get("ADD_STRING"))
        ])


    }
}