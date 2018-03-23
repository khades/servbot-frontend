var Auth = require("../../utils/auth")
var m = require("mithril")
var ConfigURL = require("../../utils/appUrl")
var states = require("../../utils/states")
module.exports ={
    state: states.LOADING,
    result: {
        channel: ""
    },
    get(channel, username) {
        this.route = m.route.get()
        this.state = states.LOADING
        Auth.request({
            method: "GET",
            url: ConfigURL(`/api/channel/${channel}/logs/userid/${username}`)
        }).then(function (response) {
            this.result = response
            this.state = states.READY
        }.bind(this))
    }
}

