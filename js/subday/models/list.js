import auth from '../../utils/auth'
import appUrl from '../../utils/appUrl'
import states from '../../utils/states'
import routes from '../../pageTemplate/routes'
import m from 'mithril'

export default {
    state: states.READY,
    channelID: "",
    route: routes.SUBDAY,
    objects:[],
    get: function (channel) {
        this.channelID = channel
        this.state = states.LOADING
        this.route = m.route.get()
        auth.request({
            url: appUrl(`api/channel/${this.channelID}/subdays`)
        }).then(response => {
            if (!!response) {
                this.objects = response
            }
            this.state = states.READY
        }).catch(error => {
            this.objects = []
            if (error.Code = 401) {
                this.state = states.FORBIDDEN
            }
            if (error.Code = 404) {
                this.state = states.NOTFOUND
            }
        })
    }
};