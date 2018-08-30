import auth from '../../utils/auth';
import appUrl from '../../utils/appUrl';
import states from '../../utils/states';
import routes from '../../pageTemplate/routes';
import m from 'mithril';

export default {
    state: states.LOADING,
    channelID: "",
    route: routes.CHANNELBANS,
    object: {
        bans: []
    },
    get: function (channel) {
        this.channelID = channel
        this.state = states.LOADING
        this.route = m.route.get()
        auth.request({
            url: appUrl(`api/channel/${this.channelID}/bans`)
        }).then(response => {
            if (!!response) {
                this.object = response
            }
            this.state = states.READY
        }).catch(error => {
            this.object = {
                bans: []
            }
            if (error.Code = 401) {
                this.state = states.FORBIDDEN
            }
        })
    }
};