var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")
var m = require("mithril")

module.exports = {
    state: states.READY,
    template: null,
    channel: "",
    name: "",
    errorTemplate: false,
    get: function (channel, name) {
        this.state = states.LOADING
        this.channel = channel
        this.name = name
        this.route = m.route.get()
        auth.request({
            url: appUrl(`api/channel/${channel}/templates/${name}`)
        }).then(response => {
            if (!!response) {
                this.template = response
            }
            this.state = states.READY
        })
    },
    save() {
        this.state = states.LOADING
        this.errorTemplate = false
        auth.request({
            url: appUrl(`api/channel/${this.template.channelID}/templates/${this.template.commandName}`),
            method: "POST",
            data: {
                template: this.template.template
            }

        }).then(response => {
            this.get(this.template.channelID, this.template.commandName)
            this.state = states.READY
        }).catch(error => {
            if (error.code == 422) {
                this.errorTemplate = true
            }
            this.state = states.READY

        })
    },
    setAliasTo() {
        this.state = states.LOADING
        this.errorTemplate = false
        auth.request({
            url: appUrl(`api/channel/${this.template.channelID}/templates/${this.template.commandName}/setAliasTo`),
            method: "POST",
            data: {
                aliasTo: this.template.aliasTo
            },
            background: true
        }).then(response => {
            this.get(this.template.channelID, this.template.commandName)
            this.state = states.READY
        })

    }
}