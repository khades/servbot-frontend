var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")
var m = require("mithril")

module.exports = {
    state: states.READY,
    object: {},
    channel: "",
    isNew() {
        return !(!!this.object.id)
    },
    route: "",
    new(channel) {
        this.object = {
            message: "",
            messageLimit: 20,
            durationLimit: 300,
            channel: channel
        }
    },
    get(channel, id) {
        this.route = m.route.get()
        this.state = states.LOADING
        auth.request({
            url: appUrl(`api/channel/${channel}/automessages/${id}`)
        }).then(response => {
            if (!!response.autoMessage) {
                this.object = response.autoMessage
                this.object.durationLimit = parseInt(this.object.durationLimit) / 1000000000
            } else {
                this.new(channel)
            }
            this.channel = response.channel
            this.state = states.READY

        }).catch(error => {
            if (error.Code = 401) {
                this.state = states.FORBIDDEN
            }
        })
    },
    push() {
        if (this.isNew() == true) {
            auth.request({
                url: appUrl(`api/channel/${this.object.channel}/automessages`),
                method: "POST",
                data: this.object
            }).then(result => {
                m.route.set(`/channel/${this.object.channel}/autoMessages/${result.ID}`)
            })
        } else {
            auth.request({
                url: appUrl(`api/channel/${this.object.channel}/automessages/${this.object.id}`),
                method: "POST",
                data: this.object
            }).then(result => {
                this.get(this.object.channel, this.object.id)
            })
        }
    }
}