var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")

module.exports = {
    state: states.READY,
    channelID: "",
    object: {

    },
    saveVK: function () {
        this.state = states.LOADING
        auth.request({
            method: "POST",
            data: this.object.vkGroupInfo,
            url: appUrl(`/api/channel/${this.channelID}/externalservices/vk`)
        }).then(response => {
            this.get(this.channelID)
            this.state = states.READY
        }).catch(error => {
            this.state = states.READY
        })
    },
    get: function (channel) {
        this.channelID = channel
        this.state = states.LOADING
        auth.request({
            url: appUrl(`api/channel/${this.channelID}/info`)
        }).then(response => {
            if (!!response) {
                this.object = response
            }
            this.state = states.READY
        }).catch(error => {
            if (error.Code = 401) {
                this.state = states.FORBIDDEN
            }
        })
    }
}