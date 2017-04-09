var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")
var m = require("mithril")
var time = require("../../utils/time")
module.exports = {
    state: states.LOADING,
    channel: "",
    channelID: "",
    subscriptions: [],
    eventSource: null,
    intervalID: null,
    leaveEventSource() {
        if (!!this.eventSource) {
            this.eventSource.close()

        }
        if (this.intervalID) {
            clearInterval(this.intervalID)
        }
        console.log("Closing event source")
    },
    getLimit: function () {
        var date = localStorage.getItem("limitDate")
        if (!!date) {
            return date
        }
        return null
    },
    setLimit: function (value) {
        var date = localStorage.setItem("limitDate", time.now().getTime())
    },
    resetLimit: function () {
        localStorage.removeItem("limitDate")
    },
    connectToEventSource(channelID) {
        if (!!this.eventSource)
            this.eventSource.close()

        this.eventSource = new EventSource(appUrl(`api/channel/${channelID}/subs/events`))
        this.get(channelID)
        this.eventSource.onmessage = function (e) {

            console.log(e.data)
            if (e.data != "ping") {
                this.get(channelID)
            }
            // 
        }.bind(this)

        this.eventSource.onerror = function (e) {
            if (this.eventSource.readyState == EventSource.CONNECTING) {
                this.get(channelID)
            }
        }.bind(this)
    },
    createEventSource(channelID) {
        this.connectToEventSource(channelID)
        this.intervalID = setInterval(function () {
            if (this.eventSource.readyState == EventSource.CLOSED) {
                console.log("Reconnecting")
                this.connectToEventSource(channelID)
            }
        }.bind(this), 10000)

    },
    get: function (channelID) {
        this.channelID = channelID
        this.route = m.route.get()
        var url = `api/channel/${channelID}/subs`
        if (!!this.getLimit()) {
            url = `api/channel/${channelID}/subs/limit/${this.getLimit()}`
        }
        auth.request({
            url: appUrl(url)
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