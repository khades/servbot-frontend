var Auth = require("../../utils/Auth")
var m = require("mithril")
var ConfigURL = require("../../utils/ConfigURL")
var LogsModel = {
    page: 1,
    pageSize: 50,
    filterString: "",
    channel: "",
    route: "",
    username: "",
    init: function (attrs) {
        this.route = m.route.get()
        var page = 1
        if (!!attrs.page) {
            page = attrs.page
        }
        this.setParams(attrs.username, attrs.channel, page)
    },
    goToPage: function (page) {
        this.page = page
        this.run()
        m.route.set(`/channel/${this.channel}/logs/${this.username}/${this.page}`)
    },
    setParams(username, channel, page) {
        this.page = page
        this.username = username
        this.channel = channel
        this.run()
    },
    authorized: true,
    messages: null,
    run() {
        Auth.request({
            method: "GET",
            url: ConfigURL(`/api/channel/${this.channel}/logs/${this.username}/${this.page}`)
        }).then(function (response) {
            this.result = response
        }.bind(this)).catch(function (error) {
            if (error.status == 403) {
                this.authorized = false
            }
        }.bind(this))
    }
}

module.exports = LogsModel