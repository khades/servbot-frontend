var m = require("mithril")
var ConfigURL = require("../../utils/appUrl")
var states = require("../../utils/states")
var LogUsersPageModel = {
    state: states.LOADING,
    object: {
        users: []
    },
    channel: null,
    route: "",
    filter: "",
    pageSize: 100,
    page: 1,
    setFilter: function (value) {
        this.page = 1
        this.filter = value
    },
    getResults: function () {
        var start = this.pageSize * (this.page - 1)
        var end = this.pageSize * this.page
        if (this.filter == "") {
            return {
                count: this.object.users.length,
                users: this.object.users.slice(start, end),
                channel: this.object.channel
            }
        } else {
            var filteredData = this.object.users.filter(function (value) {
                console.log(value)
                return value.user.startsWith(this.filter) || value.knownNicknames.some(f => f.startsWith(this.filter))
            }.bind(this))
            return {
                count: filteredData.length,
                users: filteredData.slice(start, end),
                channel: this.object.channel
            }
        }
    },
    init(channel) {
        this.route = m.route.get()
        this.filter = ""
        this.channel = channel
        m.request({
            method: "GET",
            url: ConfigURL(`api/channel/${channel}/logs`)
        }).then(function (results) {
            this.object.channel = results.channel
            if (!!results.users) {
                this.object.users = results.users.sort(function (a, b) {
                    if (a.user > b.user) {
                        return 1;
                    }
                    if (a.user < b.user) {
                        return -1;
                    }
                    // a должно быть равным b
                    return 0;
                })
            } else {
                this.object.users = []
            }
            this.state = states.READY

        }.bind(this))
    },

}

module.exports = LogUsersPageModel