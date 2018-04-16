import auth from '../../utils/auth'
import appUrl from '../../utils/appUrl'
import states from '../../utils/states'
import m from 'mithril'
import time from '../../utils/time'
import notifications from '../../notifications/notifications'
import l10n from '../../l10n/l10n'

export default {
    state: states.LOADING,
    channelID: "",
    songrequestInfo: null,
    player: null,
    videoID: null,
    playerReady: false,
    intervalID: null,
    eventSource: null,
    currentVideo: null,
    volume: 100,
    getVideoID() {
        return this.videoID
    },
    getVolume() {
        return this.volume
    },
    setVolume(volume) {
        this.volume = volume
        if (!!this.player && !!this.player.setVolume) {
            this.player.setVolume(volume)
        }
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
            if (String(event.data).startsWith("volume")) {

                var volume = parseInt(String(event.data).split(":")[1])
                this.setVolume(volume)
                m.redraw()
            }
            if (event.data == "update") {
                this.get(channelID)
            }
            if (String(event.data).startsWith("youtuberestricted")) {
                notifications.addNotification(l10n.get("SONGREQUEST_CANT_PLAY_DUE_YOUTUBE", String(event.data).replace("youtuberestricted:", "")))
            }
            if (String(event.data).startsWith("twitchrestricted")) {
                notifications.addNotification(l10n.get("SONGREQUEST_CANT_PLAY_DUE_TWITCH", String(event.data).replace("twitchrestricted:", "")))
            }
            if (String(event.data).startsWith("channelrestricted")) {
                notifications.addNotification(l10n.get("SONGREQUEST_CANT_PLAY_DUE_CHANNEL", String(event.data).replace("channelrestricted:", "")))
            }
            if (String(event.data).startsWith("tagrestricted")) {
                notifications.addNotification(l10n.get("SONGREQUEST_CANT_PLAY_DUE_TAG", String(event.data).replace("tagrestricted:", "")))
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
                this.connectToEventSource(channelID)
            }
        }.bind(this), 10000)

    },
    setAsYoutubeRestrictred(videoID) {
        var url = `/api/channel/${this.channelID}/songrequests/${videoID}/settag/youtuberestricted`
        auth.request({
            url: appUrl(url)
        })
    },
    setAsTwitchRestrictred(videoID) {
        var url = `/api/channel/${this.channelID}/songrequests/${videoID}/settag/twitchrestricted`
        auth.request({
            url: appUrl(url)
        })
    },
    setAsChannelRestrictred(videoID) {
        var url = `/api/channel/${this.channelID}/songrequests/${videoID}/settag/${this.channelID}-restricted`
        auth.request({
            url: appUrl(url)
        })
    },
    bubbleUp(id) {

        var url = `api/channel/${this.channelID}/songrequests/bubbleup/${id}`

        auth.request({
            url: appUrl(url)
        }).then(response => {
            this.state = states.READY
            this.videoID = null


        }, error => {
            this.state = states.ERROR
            throw error
        })
    },
    pushVolumeToDb(volume) {
        var url = `api/channel/${this.channelID}/songrequests/setvolume/${volume}`

        auth.request({
            url: appUrl(url)
        })
    },
    bubbleUpToSecond(id) {

        var url = `api/channel/${this.channelID}/songrequests/bubbleuptosecond/${id}`

        auth.request({
            url: appUrl(url)
        }).then(response => {
            this.state = states.READY
            if (forceSwitch == true) {
                this.videoID = null

            }

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
        }, error => {
            this.state = states.ERROR
            throw error
        })
    },

    afterInit(forceSwitch, forceRedraw) {
        if (this.songrequestInfo != null) {
            this.setVolume(this.songrequestInfo.settings.volume)

        }

        if (this.songrequestInfo == null || this.playerReady == false) {
            return
        }

        // if (this.songrequestInfo.requests.length == 0) {
        //     return
        // }

        if (this.songrequestInfo.requests.length == 0) {
            this.videoID = ""
            this.currentVideo = null
            if (!!this.player.stopVideo) {
                this.player.stopVideo()
            }
            return
        }

        if (!(forceSwitch == true) && this.songrequestInfo.requests.some(f => f.videoID == this.videoID)) {
            return
        }

        this.currentVideo = this.songrequestInfo.requests.sort(function (a, b) {
            var c = a.order
            var d = b.order
            return c - d
        })[0]

        if (this.songrequestInfo.isOwner == false) {
            return
        }


        this.videoID = this.currentVideo.videoID
        this.player.loadVideoById(this.currentVideo.videoID)
        this.player.setVolume(this.getVolume())
        if (forceRedraw == true) {
            m.redraw()

        }
    },
    saveSettings() {
        var url = `api/channel/${this.channelID}/songrequests/settings`
        auth.request({
            url: appUrl(url),
            method: "POST",
            data: this.songrequestInfo.settings
        }).then(response => {
            this.get(this.channelID)
            notifications.addNotification(l10n.get("SAVE_SUCCESSFULL"))

        })
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
};