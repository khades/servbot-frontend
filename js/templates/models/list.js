var m = require("mithril")
var TemplateModel = require("./TemplateModel")
var ConfigURL = require("../../utils/appUrl")
var states = require("../../utils/states")
var auth = require("../../utils/auth")

module.exports = {
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
    init: function (channelID) {
        this.route = m.route.get()
        this.channelID = channelID
        auth.request({
            method: "GET",
            url: ConfigURL(`/api/channel/${channelID}/templates`)
        }).then(response => {
            if (!!response) {
                this.templates = response.map(f => new TemplateModel(f))
            } else {
                this.templates = []
            }
            this.state = states.READY
        })
    }
}

