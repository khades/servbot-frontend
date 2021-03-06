var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")

module.exports = {
    state: states.READY,
    channelID: "",
    objects: [],
    removeInactive: function() {
        auth.request({
            url: appUrl(`api/channel/${this.channelID}/automessages/removeinactive`)
        }).then(response => {
            this.get(this.channelID)
        })
    },
    get: function (channel) {
        this.state = states.LOADING
        this.channelID = channel
        auth.request({
            url: appUrl(`api/channel/${channel}/automessages`)
        }).then(response => {
            if (!!response) {
                this.objects = response
            } else {
                this.objects = []
            }
            this.state = states.READY
        }).catch(error => {
            if (error.Code = 401) {
                this.state = states.FORBIDDEN
            }
        })
    }
}