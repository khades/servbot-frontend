import m from 'mithril'
import '../../../scss/modules/_template-item.scss'
import l10n from '../../l10n/l10n'
import TemplateMustashedBodyComponent from './TemplateMustashedBodyComponent'
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
function returnType(commandInfo) {
    if (commandInfo.type == "template") {
        return l10n.get("COMMAND")
    }
    if (commandInfo.type == "alias") {
        return l10n.get("ALIAS")

    }
    return l10n.get("DELETED")
}

export default {
    view: function (vnode) {
        var item = vnode.attrs.item.command
        var commandInfo = vnode.attrs.item.commandInfo
        return m(vnode.attrs.isMod == true ? "a.template-list-item" : ".template-list-item", vnode.attrs.isMod == true ? {
            oncreate: m.route.link,
            class: `template-list-item-${commandInfo.type}`,
            href: `/channel/${item.channelID}/templates/${item.commandName}`
        } : {
            class: `template-list-item-${commandInfo.type}`
        }, [
            m(".template-list-item__header", [
                m("span.template-list-item__name", item.commandName),
                m(".template-list-item__type",returnType(commandInfo))
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
};