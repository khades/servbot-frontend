
var Auth = require("../../utils/Auth")
var m = require("mithril")

var LogsModel = {
    page: 1,
    username: "",
    channel: "",
    goToPage: function (page) {
        this.page = page
        this.run()
        m.route.setPath(`/logs/${this.channel}/${this.username}/${page}`)
    },
    authorized: true,
    messages: [],
    run() {
        Auth.request({
            method: "GET",
            url: `/api/logs/${this.channel}/${this.username}/${this.page}`
        }).map(function (response) {
            this.messages = response.messages
        }.bind(this)).catch(function (error) {
            if (error.status == 403) {
                this.authorized = false
            }
        }.bind(this))
    }
}

module.exports = LogsModel