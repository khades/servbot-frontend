var m = require("mithril")
var ConfigURL = require("../../utils/ConfigURL")

var LogUsersPageModel = {
    results: [],
    channel: null,
    route: "",
    init(channel) {
        this.route = m.route.get()
        console.log("LogUsersPageModel: Setting channel " + channel)
        this.channel = channel
        m.request({
            method: "GET",
            url: ConfigURL(`api/channel/${this.channel}/logs`)
        }).then(function (results) {
            this.results = results
        }.bind(this))
    },

}

module.exports = LogUsersPageModel