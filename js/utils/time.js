var m = require("mithril")
var appUrl = require("./appUrl")
var time = {
    getTime() {
        m.request({
            url: appUrl(`api/time`),
            method: "GET"
        }).then(response => {
            var serverDate = new Date(response.time)
            var localDate = new Date()
            this.offset = serverDate.getTime() - localDate.getTime()
        })
    },
    now() {
        return new Date(new Date().getTime() + this.offset)
    }
}

module.exports = time