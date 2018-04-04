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
    currentVideo: null,

    intervalID: null,
    eventSource: null,

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
            if (event.data == "update"){
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
    skipVideo(id) {

        var url = `api/channel/${this.channelID}/songrequests/skip/${id}`

        auth.request({
            url: appUrl(url)
        }).then(response => {
            this.songrequestInfo = response
            this.state = states.READY
            this.afterInit()
        }, error => {
            this.state = states.ERROR
            throw error
        })
    },

    afterInit() {

        if (this.songrequestInfo == null || this.player == null) {
            return
        }
        //console.dir(this.player)
      //  this.player.mute()
        if (this.songrequestInfo.requests.length ==  0) {
            return
        }
        if (this.songrequestInfo.requests.some(f => f.videoID == this.videoID)) {
            return 
        }
        var currentRequest = this.songrequestInfo.requests.sort(function (a, b) {
            var c = new Date(a.date);
            var d = new Date(b.date);
            return c - d;
        })[0].videoID
        this.player.loadVideoById(currentRequest)
        this.videoID = currentRequest
    },
    get: function (channelID) {
        this.channelID = channelID
        var url = `api/channel/${channelID}/songrequests`

        auth.request({
            url: appUrl(url)
        }).then(response => {
            this.songrequestInfo = response
            this.state = states.READY
            this.afterInit()
        }, error => {
            this.state = states.ERROR
            throw error
        })
    }
}