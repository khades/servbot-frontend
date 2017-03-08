var m = require("mithril")
var TemplateModel = require("./TemplateModel")
var ConfigURL = require("../../../utils/appUrl")
var states = require("../../../utils/states")
var TemplateListModel = {
    state: states.LOADING,
    showAlias: true,
    showTemplate: true,
    showDeleted: false,
    templates: [],
    channelID: "",
    channel: "",
    route: "",
    newCommand: "",
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
    init(channelID) {
        this.route = m.route.get()
        this.channelID = channelID
        m.request({
            method: "GET",
            url: ConfigURL(`/api/channel/${channelID}/templates`)
        }).then(function (response) {
            TemplateListModel.templates = response.templates.map(f => new TemplateModel(f))
            TemplateListModel.channel = response.channel
            TemplateListModel.state = states.READY
        })
    }
}

module.exports = TemplateListModel