var m = require("mithril")
require('../../../../scss/modules/_template-item.scss')

var TemplateMustashedBodyComponent = require("./TemplateMustashedBodyComponent")

function getCommandInfo(item) {
    var commandInfo = {
        type: "deleted",
        body: "",
        icon: "delete-outline"
    }
    if (!!item.template && item.template.length > 0)
        commandInfo = {
            type: "template",
            body: item.template,
            icon: "pencil"
        }
    if (!!item.aliasTo && item.aliasTo.length > 0)
        commandInfo = {
            type: "alias",
            body: item.aliasTo,
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
            m("a.template-list-item__header", {
                oncreate: m.route.link,
                href: `/channel/${item.channelID}/templates/${item.commandName}`
            }, [
                m(`span.sprite`),
                m("span.template-list-item__name", item.commandName)
            ]),
            commandInfo.type == "template" ?
            m(TemplateMustashedBodyComponent, {
                array: vnode.attrs.item.mustashedTemplate
            }) :
            "",
            commandInfo.type == "alias" ? m(".template-list-item__body",
                // m(TemplateMustashedBodyComponent, vnode.attrs.item.mustashedTemplate)
                commandInfo.body
            ) : ""
        ])
    }
}
module.exports = TemplateListItemComponent