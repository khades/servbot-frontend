import m from './auth';
import states from './states';
import config from './appUrl';
import auth from './auth';

export default {
    channels: {},
    get(id) {
        if (!!this.channels[id]) {
            if (this.channels[id].state == states.READY)
                return this.channels[id].name
            if (this.channels[id].state == states.LOADING) {
                return "LOADING"
            }
        } else {
            this.channels[id] = {
                states: states.LOADING,
                name: ""
            }
            auth.request({
                url: config(`/api/channel/${id}/channelname`)

            }).then(result => {
                this.channels[id] = {
                    state: states.READY,
                    name: result.channel
                }
            }, error => {
                this.channels[id] = {
                    state: states.READY,
                    name: "NOT FOUND"
                }
            })
            return "LOADING"
        }

    }
};