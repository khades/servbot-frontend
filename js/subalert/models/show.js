import auth from '../../utils/auth';
import appUrl from '../../utils/appUrl';
import states from '../../utils/states';
import m from 'mithril';

export default {
    state: states.LOADING,
    subAlert: {},
    error: {},
    channelID: "",
    errorResubAlert: false,
    extended: false,
    isExtended(object) {
        return object.subPrimeMessage != "" ||
            object.subTenMessage != "" ||
            object.subTwentyFiveMessage != "" ||
            object.resubPrimeMessage != "" ||
            object.resubTenMessage != "" ||
            object.resubTwentyFiveMessage != ""
    },
    get: function (channelID) {
        this.state = states.LOADING
        this.channelID = channelID
        this.route = m.route.get()
        auth.request({
            url: appUrl(`api/channel/${channelID}/subalert`)
        }).then(response => {
            if (!!response) {
                this.subAlert = response

                this.extended = this.isExtended(response)

            }
            this.state = states.READY
        })
    },
    save() {
        this.state = states.LOADING
        this.error = {}
        auth.request({
            url: appUrl(`api/channel/${this.channelID}/subalert`),
            method: "POST",
            data: this.subAlert
        }).then(response => {
            this.get(this.channelID)
            this.state = states.READY
        }).catch(error => {
            if (error.code == 422) {
                this.error = error.message
            }
            this.state = states.READY

        })
    },

};