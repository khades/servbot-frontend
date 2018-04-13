import Auth from '../../utils/auth';
import m from 'mithril';
import ConfigURL from '../../utils/appUrl';
import states from '../../utils/states';

export default {
    state: states.LOADING,

    result: {
        user: "",
        userID: "",
        channelID: "",
        history: []
    },
    get(channelID, userID) {
        if (channelID == this.result.channelID && userID == this.result.channelID) {
            return
        }
        this.state = states.LOADING
        Auth.request({
            method: "GET",
            url: ConfigURL(`/api/channel/${channelID}/bits/${userID}`)
        }).then(function (response) {
            this.result = response

            this.state = states.READY
        }.bind(this), error => {
            this.state = states.NOTFOUND
        })
    }
};