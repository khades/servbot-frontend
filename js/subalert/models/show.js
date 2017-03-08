var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")
var m = require("mithril")

module.exports = {
    state: states.LOADING,
    subAlert: {},
    channelID: "",
    channel: "",
    errorResubAlert: false,
    get: function (channelID) {
        this.state = states.LOADING
        this.channelID = channelID
        this.route = m.route.get()
        auth.request({
            url: appUrl(`api/channel/${channelID}/subalert`)
        }).then(response => {
            if (!!response) {
                this.subAlert = response.subAlert
                this.channel = response.channel
            }
            this.state = states.READY
        })
    },
    save() {
        this.state = states.LOADING
        this.errorResubAlert = false
        this.subAlert.enabled = true
        auth.request({
            url: appUrl(`api/channel/${this.channelID}/subalert`),
            method: "POST",
            data: this.subAlert
        }).then(response => {
            this.get(this.channelID)
            this.state = states.READY
        }).catch(error => {
            if (error.code == 422) {
                this.errorResubAlert = true
            }
            this.state = states.READY

        })
    },

}