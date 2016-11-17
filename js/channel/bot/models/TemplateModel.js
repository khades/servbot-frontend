var m = require('mithril')

var TemplateModel = function (template) {
    function getCommandInfo(item) {
        var commandInfo = { type: "deleted", body: "", icon: "delete-outline" }
        if (!!item.template && item.template.length > 0)
            commandInfo = { type: "template", body: item.template, icon: "pencil" }
        if (!!item.alias && item.alias.length > 0)
            commandInfo = { type: "alias", body: item.alias, icon: "arrow-forward" }
        return commandInfo

    }
    function getMustasheDescription(list) {
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
        // .replace(/{{\s?([^}]*)\s?}}/g, f => {
        //     if (f.startsWith("{{\/")) {
        //         return "<span class=\"mustashe mustashe__end-if\"></span>"
        //     }
        //     if (f.startsWith("{{\#")) {
        //         return `<span class=\"mustashe mustashe__start-if-true\">${f.replace(/{/g, "").replace(/}/g, "").replace("\#", "")}</span>`
        //     }
        //     if (f.startsWith("{{\^")) {
        //         return `<span class=\"mustashe mustashe__start-if-false\">${f.replace(/{/g, "").replace(/}/g, "").replace("\^", "")}</span>`
        //     }

        //     return `<span class=\"mustashe mustashe__variable\">${f.replace(/{/g, "").replace(/}/g, "")}</span>`

    }




    var commandInfo = getCommandInfo(template)
    var mustashedTemplate = commandInfo.type == "template" ? getMustasheDescription(commandInfo.body) : []
    return {
        command: template,
        commandInfo: commandInfo,
        mustashedTemplate: mustashedTemplate
    }
}

module.exports = TemplateModel