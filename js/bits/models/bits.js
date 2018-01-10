var Auth = require("../../utils/auth")
var m = require("mithril")
var ConfigURL = require("../../utils/appUrl")
var states = require("../../utils/states")
module.exports = {
    state: states.LOADING,
    result: [],
    get(channel, username) {
        this.route = m.route.get()
        this.state = states.LOADING
        Auth.request({
            method: "GET",
            url: ConfigURL(`/api/channel/${channel}/bits`)
        }).then(response => {
            console.log(response)
            if (!!response) {
                this.result = response

            }
            this.state = states.READY
        })
    }
}

