import auth from '../../utils/auth';
import appUrl from '../../utils/appUrl';
import states from '../../utils/states';

export default {
    state: states.READY,
    channelID: "",
    objects: [],
    removeInactive: function() {
        auth.request({
            url: appUrl(`api/channel/${this.channelID}/automessages/removeinactive`)
        }).then(response => {
            this.get(this.channelID)
        })
    },
    get: function (channel) {
        this.state = states.LOADING
        this.channelID = channel
        auth.request({
            url: appUrl(`api/channel/${channel}/automessages`)
        }).then(response => {
            if (!!response) {
                this.objects = response
            } else {
                this.objects = []
            }
            this.state = states.READY
        }).catch(error => {
            this.objects = []

            if (error.Code = 401) {
                this.state = states.FORBIDDEN
            }
        })
    }
};