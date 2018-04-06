var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")
var m = require("mithril")
var time = require("../../utils/time")
module.exports = {
    state: states.LOADING,
    channelID: "",
    songrequestInfo: null,
    player: null,
    videoID: null,
    playerReady: false,
    intervalID: null,
    eventSource: null,
    getVideoID() {
        return this.videoID
    },
    leaveEventSource() {
        if (!!this.eventSource) {
            this.eventSource.close()

        }
        if (this.intervalID) {
            clearInterval(this.intervalID)
        }
    },
    connectToEventSource(channelID) {
        this.channelID = channelID
        this.route = m.route.get()

        var wasOpen = !!this.eventSource
        if (wasOpen)
            this.eventSource.close()
        this.eventSource = new WebSocket(appUrl(`api/channel/${channelID}/songrequests/events`).replace("https", "wss").replace("http", "ws"))

        this.eventSource.onopen = function (event) {
            this.get(channelID)
        }.bind(this)

        this.eventSource.onclose = function (event) {
            m.redraw()

        };
        this.eventSource.onerror = function (error) {
            m.redraw()
        }
        this.eventSource.onmessage = function (event) {
            if (event.data == "update") {
                this.get(channelID)
            }

        }.bind(this)

        this.eventSource.onerror = function (error) {
            m.redraw()
        }
    },
    createEventSource(channelID) {
        this.connectToEventSource(channelID)
        this.intervalID = setInterval(function () {
            if (this.eventSource.readyState == WebSocket.CLOSED) {
                m.redraw()
                console.log("Reconnecting")
                this.connectToEventSource(channelID)
            }
        }.bind(this), 10000)

    },
    bubbleUp(id, forceSwitch) {

        var url = `api/channel/${this.channelID}/songrequests/bubbleup/${id}`

        auth.request({
            url: appUrl(url)
        }).then(response => {
            this.state = states.READY
            this.afterInit(forceSwitch)
            console.log("Afterinit")

        }, error => {
            this.state = states.ERROR
            throw error
        })
    },
    skipVideo(id) {

        var url = `api/channel/${this.channelID}/songrequests/skip/${id}`

        auth.request({
            url: appUrl(url)
        }).then(response => {
            this.songrequestInfo = response
            this.state = states.READY
            this.afterInit()
            console.log("Afterinit")
        }, error => {
            this.state = states.ERROR
            throw error
        })
    },

    afterInit(forceSwitch) {

        if (this.songrequestInfo == null || this.playerReady == false) {
            return
        }

        if (this.songrequestInfo.requests.length == 0) {
            return
        }

        if (this.songrequestInfo.requests.some(f => f.videoID == this.videoID)) {
            return
        }
        console.log("BeforeSortInit")

        var currentRequest = this.songrequestInfo.requests.sort(function (a, b) {
            var c = a.order
            var d = b.order
            return c - d
        })[0].videoID
        this.videoID = currentRequest
        console.log("onInit")
        this.player.loadVideoById(currentRequest)
        m.redraw()
    },
    get: function (channelID) {
        this.channelID = channelID
        var url = `api/channel/${channelID}/songrequests`
        console.log("Running get")
        auth.request({
            url: appUrl(url)
        }).then(response => {
            this.songrequestInfo = response
            this.state = states.READY
            this.afterInit()
            console.log("AfterInit")

        }, error => {
            this.state = states.ERROR
            throw error
        })
    }
}