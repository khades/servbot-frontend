var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")
var m = require("mithril")

module.exports = {
    state: states.READY,
    object: {},
    channelID : "",
    error: null,
    isValid: true,
    isNew() {
        return !(!!this.object.id)
    },
    route: "",
    new(channelID) {
        this.channelID = channelID
        this.isValid = true

        this.object = {
            message: "",
            game: "",
            messageLimit: 50,
            durationLimit: 300,
            channelID: channelID
        }
    },
    get(channelID, id) {
        this.channelID = channelID
        this.isValid = true
        this.route = m.route.get()
        this.state = states.LOADING
        auth.request({
            url: appUrl(`api/channel/${channelID}/automessages/${id}`)
        }).then(response => {
            if (!!response) {
                this.object = response
                this.object.durationLimit = parseInt(this.object.durationLimit) / 1000000000
            } else {
                this.new(channelID)
            }
            this.channel = response.channel
            this.state = states.READY

        }).catch(error => {
            if (error.status == 401) {
                this.state = states.FORBIDDEN
            }
        })
    },
    push() {
        if (this.isNew() == true) {
            auth.request({
                url: appUrl(`api/channel/${this.object.channelID}/automessages`),
                method: "POST",
                data: this.object
            }).then(result => {
                m.route.set(`/channel/${this.object.channelID}/autoMessages/${result.ID}`)
                this.isValid = true
            }).catch(error => {
                if (error.status == 422) {
                    this.isValid = false

                }
            })
        } else {
            auth.request({
                url: appUrl(`api/channel/${this.object.channelID}/automessages/${this.object.id}`),
                method: "POST",
                data: this.object
            }).then(result => {
                this.isValid = true

                this.get(this.object.channelID, this.object.id)
            }).catch(error => {
                if (error.code == 422) {
                    this.isValid = false

                }
            })
        }
    }
}