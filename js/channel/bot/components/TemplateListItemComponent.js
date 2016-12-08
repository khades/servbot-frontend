import * as m from "mithril"

import  TemplateMustashedBodyComponent  from "./TemplateMustashedBodyComponent"

function getCommandInfo(item) {
    var commandInfo = {
        type: "deleted",
        body: "",
        icon: "delete-outline"
    }
    if (!!item.Template && item.Template.length > 0)
        commandInfo = {
            type: "template",
            body: item.Template,
            icon: "pencil"
        }
    if (!!item.AliasTo && item.AliasTo.length > 0)
        commandInfo = {
            type: "alias",
            body: item.AliasTo,
            icon: "arrow-forward"
        }
    return commandInfo

}
var TemplateListItemComponent = {
    view: function (vnode) {
        var item = vnode.attrs.item.command
        var commandInfo = vnode.attrs.item.commandInfo
        return m(".template-list-item", {
            class: `template-list-item-${commandInfo.type}`
        }, [
            m(".template-list-item__header", [
                m(`span.sprite`),
                m("span.template-list-item__name", item.CommandName)
            ]),
            commandInfo.type == "template" ?
            m(TemplateMustashedBodyComponent, {
                array: vnode.attrs.item.mustashedTemplate
            }) :
            m(".nothing"),
            commandInfo.type == "alias" ? m(".template-list-item__body",
                // m(TemplateMustashedBodyComponent, vnode.attrs.item.mustashedTemplate)
                commandInfo.body
            ) : m(".nothing")
        ])
    }
}
export default TemplateListItemComponent 