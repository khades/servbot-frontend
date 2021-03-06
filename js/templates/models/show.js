var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")
var m = require("mithril")
var time = require("../../utils/time")
module.exports = {
    state: states.READY,
    template: null,
    channelID: "",

    name: "",
    errorTemplate: false,

    get: function (channelID, name) {
        this.extended = false
        this.state = states.LOADING
        this.channelID = channelID
        this.name = name
        this.route = m.route.get()
        auth.request({
            url: appUrl(`api/channel/${channelID}/templates/${name}`)
        }).then(response => {
            if (!!response) {

                this.template = response

 
                if (response.integerRandomizer.enabled == false &&
                    response.preventDebounce == false &&
                    response.preventRedirect == false &&
                    response.showOffline == true &&
                    response.showOnline == true &&
                    response.onlyPrivate == false &&
                    response.stringRandomizer.enabled == false) {
                    this.extended = false
                } else {
                    this.extended = true
                }


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
            data: this.template
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