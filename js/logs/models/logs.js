import Auth from '../../utils/auth';
import m from 'mithril';
import ConfigURL from '../../utils/appUrl';
import states from '../../utils/states';

export default {
    state: states.LOADING,
    result: {
        channel: ""
    },
    get(channel, username) {
        this.route = m.route.get()
        this.state = states.LOADING
        Auth.request({
            method: "GET",
            url: ConfigURL(`/api/channel/${channel}/logs/userid/${username}`)
        }).then(function (response) {
            this.result = response
            this.state = states.READY
        }.bind(this))
    }
};

