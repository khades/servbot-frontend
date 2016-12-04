import * as m from "mithril"

import ConfigURL from "../../utils/ConfigURL"

var LogUsersPageModel = {
    results: [],
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
                count: this.results.length,
                users: this.results.slice(start, end)
            }
        } else {
            var filteredData = this.results.filter(function (value) {
                return value.User.startsWith(this.filter)
            }.bind(this))
            return {
                count: filteredData.length,
                users: filteredData.slice(start, end)
            }
        }
    },
    init(channel) {
        this.route = m.route.get()
        console.log("LogUsersPageModel: Setting channel " + channel)
        this.filter = ""
        this.channel = channel
        m.request({
            method: "GET",
            url: ConfigURL(`api/channel/${this.channel}/logs`)
        }).then(function (results) {
            this.results = results.sort(function (a, b) {
                if (a.User > b.User) {
                    return 1;
                }
                if (a.User < b.User) {
                    return -1;
                }
                // a должно быть равным b
                return 0;
            })
        }.bind(this))
    },

}

export default LogUsersPageModel 