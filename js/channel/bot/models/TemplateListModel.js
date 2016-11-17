var m = require("mithril")
var TemplateModel = require("./TemplateModel")
var TemplateListModel = {
    showAlias: true,
    showTemplate: true,
    showDeleted: false,
    templates: [],
    getTemplates() {
        var filter = []
        if (this.showAlias == true) {
            filter.push("alias")
        }
        if (this.showTemplate == true) {
            filter.push("template")
        }
        if (this.showDeleted == true) {
            filter.push("deleted")
        }
        var result = this.templates.filter(f => filter.some(a => a == f.commandInfo.type)).sort((a, b) => {
            if (a.command.commandName < b.command.commandName) return -1;
            if (a.command.commandName > b.command.commandName) return 1;
            return 0;
        })
        return result
    },
    pullTemplates(channel) {
        m.request({
            method: "GET",
            url: `/api/channel/${channel}/bot/templates`
        }).map(response => {
            TemplateListModel.templates = response.map(f => new TemplateModel(f))
        })
    }
}

module.exports = TemplateListModel
