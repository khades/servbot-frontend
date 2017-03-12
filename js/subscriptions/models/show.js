var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")
var m = require("mithril")

module.exports = {
    state: states.LOADING,
    channel: "",
    subscriptions: [],
    eventSource: null,
    leaveEventSource() {
        if (!!this.eventSource)
            this.eventSource.close()
        console.log("Closing event source")
    },
    createEventSource(channelID) {
        if (!!this.eventSource)
            this.eventSource.close()

        this.eventSource = new EventSource(appUrl(`api/channel/${channelID}/subs/events`))
        this.eventSource.onmessage = function (e) {
            console.log("got reload")
            this.get(channelID)
        }.bind(this)

        this.eventSource.onerror = function (e) {
            if (this.readyState == EventSource.CONNECTING) {
                this.get(channelID)
            }
        }.bind(this)
    },
    get: function (channelID) {
        this.route = m.route.get()
        auth.request({
            url: appUrl(`api/channel/${channelID}/subs`)
        }).then(response => {
            if (!!response) {
                if (!!response.subscriptions) {
                    this.subscriptions = response.subscriptions
                } else {
                    this.subscriptions = []
                }
                this.channel = response.channel
            }
            this.state = states.READY
        })
    },

}