import auth from '../../utils/auth';
import appUrl from '../../utils/appUrl';
import states from '../../utils/states';
import m from 'mithril';

export default {
    state: states.LOADING,
    object: {
        modChannels: []
    },
    get: function () {
        this.state = states.LOADING
        auth.request({
            url: appUrl(`api/user/index`)
        }).then(response => {
            this.object = response
            this.state = states.READY
        })
    }

};