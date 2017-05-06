var Auth = require("../../utils/auth")
var m = require("mithril")
var ConfigURL = require("../../utils/appUrl")
var states = require("../../utils/states")
var LogsModel = {
    state: states.LOADING,
    result: {
        channel: ""
    },
    get(channel, username) {
        this.route = m.route.get()
        this.state = states.LOADING
        Auth.request({
            method: "GET",
            url: ConfigURL(`/api/channel/${channel}/bits`)
        }).then(function (response) {
            this.result = response
            if (!(!!this.result.bits)) {
                this.result.bits = []
            }
            this.state = states.READY

        }.bind(this))
    }
}

module.exports = LogsModel