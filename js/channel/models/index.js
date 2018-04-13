import auth from '../../utils/auth';
import appUrl from '../../utils/appUrl';
import states from '../../utils/states';
import m from 'mithril';

export default {
    state: states.LOADING,
    channel: "",
    modChannels:[],
    get: function (channel) {
        this.state = states.LOADING
        this.route = m.route.get()
        auth.request({
            url: appUrl(`api/channel/${channel}`)
        }).then(response => {
            this.channel = response.channel
            this.channelInfo = response
            this.state = states.READY
            this.modChannels = response.modChannels
        }).catch(error => {
            if (error.Code == 500) {
                this.state = states.FORBIDDEN
            }
        })
    }
};