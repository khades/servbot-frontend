var Auth = require("../../utils/auth")
var m = require("mithril")
var ConfigURL = require("../../utils/appUrl")
var states = require("../../utils/states")
module.exports = {
    state: states.LOADING,

    result: {
        user: "",
        userID: "",
        channelID: "",
        history: []
    },
    get(channelID, userID) {
        if (channelID == this.result.channelID && userID == this.result.channelID) {
            return
        }
        this.state = states.LOADING
        Auth.request({
            method: "GET",
            url: ConfigURL(`/api/channel/${channelID}/bits/${userID}`)
        }).then(function (response) {
            this.result = response

            this.state = states.READY
        }.bind(this), error => {
            this.state = states.NOTFOUND
        })
    }
}