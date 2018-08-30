import auth from '../../utils/auth';
import appUrl from '../../utils/appUrl';
import states from '../../utils/states';

export default {
    state: states.READY,
    channelID: "",
    object: {

    },
    saveVK: function () {
        this.state = states.LOADING
        auth.request({
            method: "POST",
            data: this.object.vkGroupInfo,
            url: appUrl(`/api/channel/${this.channelID}/externalservices/vk`)
        }).then(response => {
            this.get(this.channelID)
            this.state = states.READY
        }).catch(error => {
            this.state = states.READY
        })
    },
    saveTwitchDJ: function () {
        this.state = states.LOADING
        auth.request({
            method: "POST",
            data: this.object.twitchDJ,
            url: appUrl(`/api/channel/${this.channelID}/externalservices/twitchdj`)
        }).then(response => {
            this.get(this.channelID)
            this.state = states.READY
        }).catch(error => {
            this.state = states.READY
        })
    },
    get: function (channel) {
        this.channelID = channel
        this.state = states.LOADING
        auth.request({
            url: appUrl(`api/channel/${this.channelID}/info`)
        }).then(response => {
            if (!!response) {
                this.object = response
            }
            this.state = states.READY
        }).catch(error => {
            this.object = {}
            if (error.Code = 401) {
                this.state = states.FORBIDDEN
            }
        })
    }
};