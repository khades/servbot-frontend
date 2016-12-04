import * as m from "mithril"

var TemplateMustashedBodyComponent = {
    view: function (vnode) {
        return m(".template-list-item__body", vnode.attrs.array.map(line => {
            if (line.startsWith("|mustashe|")) {
                var rawLine = line.replace("|mustashe|", "")
                if (rawLine.startsWith("\/")) {
                    return m("span.mustashe.mustashe__end-if")
                }
                if (rawLine.startsWith("\#")) {
                    return m("span.mustashe.mustashe__start-if-true", rawLine.replace("\#", ""))
                }
                if (rawLine.startsWith("\^")) {
                    return m("span.mustashe.mustashe__start-if-false", rawLine.replace("\^", ""))
                }
                return m("span.mustashe.mustashe__variable", rawLine)
            } else
                return line.trim()
        }))
    }
}

export default TemplateMustashedBodyComponent 