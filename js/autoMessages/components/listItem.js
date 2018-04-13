import m from 'mithril';
import model from '../models/list';
import l10n from '../../l10n/l10n';
function generateName(item) {
    var message = item.message
    if (message.trim() != "" || !(!!item.history) || item.history.length == 0) {
        return message
    }
    var historyItems = item.history.filter(f => !!f.message && f.message.trim() != "").sort((a, b) => a.date < b.date)
    if (historyItems.length == 0) {
        return ""
    } else {
        return historyItems[0].message
    }
}

export default {
    view(vnode) {

        return m("a.automessage-list__item", {
            oncreate: m.route.link,
            href: `/channel/${m.route.param("channel")}/autoMessages/${vnode.attrs.id}`

        }, [
            m('.automessage-list__item__header', [
                m(".automessage-list__item__message", generateName(vnode.attrs)),
                vnode.attrs.message.trim() == "" ? m(".automessage-list__item__status", l10n.get('DELETED')) : ""
            ]),
            m('.automessage-list__item__right-container', [
                m(".automessage-list__item__message-limit", vnode.attrs.messageThreshold < 0 ? `0/${vnode.attrs.messageLimit}` : `${vnode.attrs.messageThreshold}/${vnode.attrs.messageLimit}`),
                m(".automessage-list__item__duration-limit", `${new Date(vnode.attrs.durationThreshold).toLocaleString()} (${vnode.attrs.durationLimit/1000000000})`), !!vnode.attrs.game && vnode.attrs.game != "" ? m(".automessage-list__item__game", vnode.attrs.game) : null
            ])

        ])
    }
};