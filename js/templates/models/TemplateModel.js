var m = require("mithril")
class TemplateModel {
    constructor(template) {
        this.command = template
        this.commandInfo = this.getCommandInfo(template)
        this.mustashedTemplate = this.commandInfo.type == "template" ? this.getMustasheDescription(this.commandInfo.body) : []
    }

    getCommandInfo(item) {
        var commandInfo = { type: "deleted", body: "", icon: "delete-outline" }
        if (!!item.template && item.template.length > 0)
            commandInfo = { type: "template", body: item.template, icon: "pencil" }
        if (!!item.aliasTo && item.aliasTo.length > 0 && item.commandName != item.aliasTo)
            commandInfo = { type: "alias", body: item.aliasTo, icon: "arrow-forward" }
        return commandInfo

    }
     getMustasheDescription(list) {
        var superline = list.replace(/{ /gi, "{")
            .replace(/ }/gi, "}")
            .replace(/{{{/gi, "{{")
            .replace(/}}}/gi, "}}")
            .replace("@{{messageObject.user}}", "{{messageObject.user}}")
            .replace(/}}/g, "|delimiter|")
            .replace(/{{/g, "|delimiter||mustashe|")
            .split("|delimiter|")
            .filter(f => f !== "")
        return superline
 
    }
}

module.exports = TemplateModel 