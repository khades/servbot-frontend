import m from 'mithril'
import input from '../../basicWidgets/input'
import l10n from '../../l10n/l10n'
import model from '../models/bannedtracks'
import formatDuration from '../../utils/formatDuration'
import '../../../scss/modules/_songrequests-library-item.scss'

export default {

    view(vnode) {
        var banIssuer = ""

        vnode.attrs.tags.some(f => {
            if (f.tag == m.route.param("channel") + "-restricted") {
                banIssuer = f.user
                return true
            }
            return false
        })

        return m(".songrequests-library-item", [
            m("a.songrequests-library-item__header", [
                m(".songrequests-library-item__title", {
                    target: "_blank",
                    href: "https://youtu.be/" + vnode.attrs.videoID
                }, vnode.attrs.title + " — " + formatDuration(vnode.attrs.length / 1000000000)),
                m(".songrequests-library-item__ban-issuer", "@"+banIssuer)
            ]),
            m(".songrequests-library-item__footer", [

                m("button.songrequests-library-item__unban", {
                    type: "button",
                    onclick(event) {
                        event.redraw = false
                        model.unban(vnode.attrs)
                    }
                }, l10n.get("SONGREQUESTS_UNBAN_TRACK"))
            ])
            // tags.length > 0 ? m(".songrequests-library-item__tags", vnode.attrs.tags.filter(f => {
            //     if (f.tag.endsWith("-restricted") && f.tag != m.route.param("channel") + "-restricted")
            //         return false
            //     return true
            // }).map(f => {
            //     return m(".songrequests-library-item__tag", f.tag)
            // })) : null

        ])
    }
}