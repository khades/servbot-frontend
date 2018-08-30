import auth from '../../utils/auth';
import appUrl from '../../utils/appUrl';
import states from '../../utils/states';
import routes from '../../pageTemplate/routes';
import m from 'mithril';

export default {
    state: states.READY,
    channelID: "",
    route: routes.SUBTRAIN,
    object: {

    },
    save: function () {
        this.state = states.LOADING
        auth.request({
            method: "POST",
            data: this.object,
            url: appUrl(`/api/channel/${this.channelID}/subtrain`)
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
        this.route = m.route.get()
        auth.request({
            url: appUrl(`api/channel/${this.channelID}/subtrain`)
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