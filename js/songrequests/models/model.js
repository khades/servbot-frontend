var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")
var m = require("mithril")
var time = require("../../utils/time")
module.exports = {
    state: states.LOADING,
    channelID: "",
    songrequestInfo: null,

    get: function (channelID) {
        this.channelID = channelID
        var url = `api/channel/${channelID}/songrequests`

        auth.request({
            url: appUrl(url)
        }).then(response => {
            this.songrequestInfo = response
            this.state = states.READY
        }, error => {
            this.state = states.ERROR
            throw error
        })
    }
}