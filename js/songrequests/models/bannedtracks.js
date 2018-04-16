import states from '../../utils/states'
import m from 'mithril'
import auth from '../../utils/auth'
import appUrl from '../../utils/appUrl'
import notifications from '../../notifications/notifications'
import l10n from '../../l10n/l10n'

export default {
    state: states.LOADING,
    page: 1,
    data: null,
    getPage() {
        return this.page
    },
    setPage(page) {
        console.log(page)
        this.page = page
        this.get()
    },
    get() {
        var url = `/api/channel/${m.route.param("channel")}/songrequests/bannedtracks`
        auth.request({
            url: appUrl(url),
            data: {
                page: this.page
            }
        }).then(response => {
            this.data = response
            this.state = states.READY
        })
    },
    unban(video) {

        var url = `/api/channel/${m.route.param("channel")}/songrequests/${video.videoID}/unban`
        auth.request({
            url: appUrl(url)
        }).then(result => {
            notifications.addNotification(l10n.get("SONGREQUEST_UNBANNED", video.title))
            this.get()
        })
    },
}