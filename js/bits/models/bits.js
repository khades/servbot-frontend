import Auth from '../../utils/auth';
import m from 'mithril';
import ConfigURL from '../../utils/appUrl';
import states from '../../utils/states';

export default {
    state: states.LOADING,
    result: [],
    channelID: "",
    filter: "",
    setFilter(value) {
        this.filter = value
        this.state = states.LOADING
        Auth.request({
            method: "GET",
            url: ConfigURL(`/api/channel/${this.channelID}/bits/search/${value}`)
        }).then(response => {
            if (!!response) {
                this.result = response

            }
            this.state = states.READY
        })
    },
    get(channelID, username) {
        this.route = m.route.get()
        this.channelID = channelID
        this.state = states.LOADING
        this.filter = ""
        Auth.request({
            method: "GET",
            url: ConfigURL(`/api/channel/${channelID}/bits`)
        }).then(response => {
            if (!!response) {
                this.result = response

            }
            this.state = states.READY
        })
    }
};