var m = require("mithril")
var ConfigURL = require("../../utils/appUrl")
var states = require("../../utils/states")
module.exports = {
    state: states.LOADING,
    results: [],
    channelID: null,
    route: "",
    filter: "",
    setFilter(filter) {
        this.filter = filter
        this.state = states.LOADING
        m.request({
            method: "GET",
            url: ConfigURL(`api/channel/${this.channelID}/logs/search/${filter}`)
        }).then(results => {
            this.results = results
            this.state = states.READY
        })
    },
    init(channelID) {
        this.state = states.LOADING
        this.route = m.route.get()
        this.filter = ""
        this.channelID = channelID
        m.request({
            method: "GET",
            url: ConfigURL(`api/channel/${channelID}/logs`)
        }).then(results => {
            this.results = results
            this.state = states.READY
        })
    },

}

