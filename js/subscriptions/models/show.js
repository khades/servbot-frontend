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
        var date = localStorage.getItem(`${this.channelID}+limitDate`)
        if (!!date) {
            return date
        }
        return null
    },

    setLimit: function (value) {
        localStorage.setItem(`${this.channelID}+limitDate`, time.now().getTime())
    },
    resetLimit: function () {
        localStorage.removeItem(`${this.channelID}+limitDate`)
    },

    getBookmark: function () {
        var bookmark = localStorage.getItem(`${this.channelID}+subBookmark`)
        if (!!bookmark) {
            return bookmark
        }
        return null
    },
    setBookmark: function (id) {
        localStorage.setItem(`${this.channelID}+subBookmark`, id)
    },
    resetBookmark: function () {
        localStorage.removeItem(`${this.channelID}+subBookmark`)
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
                m.redraw()
                this.get(channelID)
            }
        }.bind(this)
    },
    createEventSource(channelID) {
        this.connectToEventSource(channelID)
        this.intervalID = setInterval(function () {
            if (this.eventSource.readyState == EventSource.CLOSED) {
                m.redraw()
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
        }, error => {
            this.state = states.ERROR
            throw error
        })
    },

}