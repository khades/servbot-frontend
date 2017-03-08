var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")

module.exports = {
    state: states.READY,
    object: {
        autoMessages: []
    },
    get: function (channel) {
        this.state = states.LOADING
        auth.request({
            url: appUrl(`api/channel/${channel}/automessages`)
        }).then(response => {
            if (!!response) {
                this.object = response

            } else {
                this.object = {
                    autoMessages: []
                }
            }
            this.state = states.READY
        }).catch(error => {
            if (error.Code = 401) {
                this.state = states.FORBIDDEN
            }
        })
    }
}