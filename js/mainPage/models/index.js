var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")
var m = require("mithril")

module.exports = {
    state: states.LOADING,
    object: {
        modChannels: []
    },
    get: function () {
        this.state = states.LOADING
        auth.request({
            url: appUrl(`api/user/index`)
        }).then(response => {
            this.object = response
            this.state = states.READY
        })
    }

}