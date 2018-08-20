var f = {
    connectToEventSource(url, initfunc) {


        var wasOpen = !!this.eventSource
        if (wasOpen)
            this.eventSource.close()
        this.eventSource = new WebSocket(appUrl(url).replace("https", "wss").replace("http", "ws"))

        this.eventSource.onopen = function (event) {
            initfunc()
        }.bind(this)

        this.eventSource.onclose = function (event) {
            m.redraw()

        }
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
                initfunc()
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
    }
}