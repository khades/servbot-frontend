import auth from '../../utils/auth';
import appUrl from '../../utils/appUrl';
import states from '../../utils/states';
import m from 'mithril';
import time from '../../utils/time';

export default {
    state: states.LOADING,
    channelID: "",
    subscriptions: [{
            user: "khades",
            userID: "sadasd",
            date: new Date(),
            count: 1,
            id:1
        },
        {
            user: "khades",
            userID: "sadasd",
            date: new Date(),
            count: 1,
            id:2
        }
    ],
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
        this.channelID = channelID
        this.route = m.route.get()

        var wasOpen = !!this.eventSource
        if (wasOpen)
            this.eventSource.close()
        this.eventSource = new WebSocket(appUrl(`api/channel/${channelID}/subs/events`).replace("https", "wss").replace("http", "ws"))
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
            if (event.data == "newSub") {
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
    get: function (channelID) {
        var url = `api/channel/${channelID}/subs`
        if (!!this.getLimit()) {
            url = `api/channel/${channelID}/subs/limit/${this.getLimit()}`
        }
        auth.request({
            url: appUrl(url)
        }).then(response => {
            if (!!response) {
                if (!!response) {
                    // this.subscriptions = response
                    this.subscriptions = [{
                        user: "khades",
                        userID: "sadasd",
                        date: new Date(),
                        count: 1
                    }, {
                        user: "khades",
                        userID: "sadasd",
                        date: new Date(),
                        count: 1
                    }]
                } else {
                    // this.subscriptions = []
                    this.subscriptions = [{
                            user: "khades",
                            userID: "sadasd",
                            date: new Date(),
                            count: 1
                        },
                        {
                            user: "khades",
                            userID: "sadasd",
                            date: new Date(),
                            count: 1
                        }
                    ]
                }
            }
            this.state = states.READY
        }, error => {
            this.state = states.ERROR
            throw error
        })
    },

};