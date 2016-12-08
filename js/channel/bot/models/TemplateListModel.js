var m = require("mithril")
var TemplateModel = require("./TemplateModel")
var ConfigURL = require("../../../utils/ConfigURL")

var TemplateListModel = {
    showAlias: true,
    showTemplate: true,
    showDeleted: false,
    templates: [],
    route: "",
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
            if (a.command.CommandName < b.command.CommandName) return -1;
            if (a.command.CommandName > b.command.CommandName) return 1;
            return 0;
        })
        return result
    },
    init(channel) {
        this.route = m.route.get()
        m.request({
            method: "GET",
            url: ConfigURL(`/api/channel/${channel}/templates`)
        }).then(function (response) {
            TemplateListModel.templates = response.map(f => new TemplateModel(f))
        })
    }
}

module.exports = TemplateListModel