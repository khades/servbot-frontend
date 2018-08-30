import auth from '../../utils/auth'
import appUrl from '../../utils/appUrl'
import states from '../../utils/states'
import m from 'mithril'
import l10n from '../../l10n/l10n'
import notifications from "../../notifications/notifications"

export default {
    state: states.READY,
    object: {},
    channelID: "",
    error: null,
    isValid: true,
    isNew: false,
    route: "",
    new(channelID) {
        if (this.isNew == true && this.channelID == channelID) {
            return
        }
        this.isNew = true
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
        this.isNew = false
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
                this.isNew(channelID)
            }
            this.channel = response.channel
            this.state = states.READY

        }).catch(error => {
            this.object = {}
            if (error.status == 401) {
                this.state = states.FORBIDDEN
            }
        })
    },
    push() {
        if (this.isNew == true) {
            auth.request({
                url: appUrl(`api/channel/${this.object.channelID}/automessages`),
                method: "POST",
                data: this.object
            }).then(result => {
                this.isValid = true
                this.isNew = false
                m.route.set(`/channel/${this.object.channelID}/autoMessages/${result.ID}`)
                notifications.addNotification(l10n.get("SAVE_SUCCESSFULL"))

            }).catch(error => {
                if (error.code == 422) {
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
                this.isNew = false
                this.get(this.object.channelID, this.object.id)
                notifications.addNotification(l10n.get("SAVE_SUCCESSFULL"))

            }).catch(error => {
                if (error.code == 422) {
                    this.isValid = false

                }
            })
        }
    }
};