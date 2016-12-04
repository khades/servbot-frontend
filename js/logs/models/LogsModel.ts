import { Auth } from "../../utils/Auth"
import * as m from "mithril"
import { ConfigURL } from "../../utils/ConfigURL"

var LogsModel = {
    filterString: "",
    channel: "",
    route: "",
    username: "",
    page: 1,
    result: null,
    init: function (attrs) {
        this.route = m.route.get()
        if (!!attrs.page) {
            this.page = attrs.page
        }
        this.setParams(attrs.username, attrs.channel)
    },
    goToPage: function (page) {
        this.page = page
        this.run()
        m.route.set(`/channel/${this.channel}/logs/${this.username}`)
    },
    setParams(username, channel) {
        this.username = username
        this.channel = channel
        this.run()
    },
    authorized: true,
    messages: null,
    run() {
        Auth.request({
            method: "GET",
            url: ConfigURL(`/api/channel/${this.channel}/logs/${this.username}`)
        }).then(function (response) {
            this.result = response
        }.bind(this)).catch(function (error) {
            if (error.status == 403) {
                this.authorized = false
            }
        }.bind(this))
    }
}

export { LogsModel }