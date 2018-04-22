import m from 'mithril';
import model from './models/show';
import '../../scss/modules/_subscriptions-show.scss';
import states from '../utils/states';
var generateClass = (f) => {
    if (f.isPrime || f.subPlan == "Prime")
        return "subscriptions-show__item__user--prime"
    if (f.isPrime || f.subPlan == "2000")
        return "subscriptions-show__item__user--ten-dollars"
    if (f.isPrime || f.subPlan == "3000")
        return "subscriptions-show__item__user--twenty-five-dollars"
    return "subscriptions-show__item__user--five-dollars"
}
import channelName from '../utils/channelName';
import routes from '../pageTemplate/routes';
import l10n from '../l10n/l10n';

export default {
    oninit: function (vnode) {
        vnode.state.route = m.route.get()
        model.createEventSource(m.route.param("channel"))
    },

    onupdate: function (vnode) {
        if (vnode.state.route == m.route.get())
            return
        vnode.state.route = m.route.get()
        model.createEventSource(m.route.param("channel"))
    },

    onremove: function (vnode) {
        model.leaveEventSource(m.route.param("channel"))
    },
    route: routes.SUBSCRIPTIONS,
    getTitle() {
        return l10n.get("SUBSCRIPTIONS_TITLE", channelName.get(m.route.param("channel")))
    },

    view(vnode) {
        return m(".subscriptions-show", [
            m(".subscriptions-show__hgroup", [
                m("div",[
                    m(".subscriptions-show__header", l10n.get("SUBSCRIPTIONS_TITLE", channelName.get(m.route.param("channel")))),

                    m(".subscriptions-show__threshold", model.getLimit() == null ? l10n.get("SUBSCRIPTIONS_LAST_THREE_DAYS", model.subscriptions.length) : l10n.get("SUBSCRIPTIONS_SINCE_DATE", new Date(parseInt(model.getLimit())).toLocaleString(), model.subscriptions.length)),

                ]),

                m(".subscriptions-show__buttons", [
                    m('button', {
                        onclick: () => {
                            model.setLimit()
                            model.get(model.channelID)
                        }
                    }, l10n.get("MARK_AS_READ")),
                    m('button', {
                        onclick: () => {
                            model.resetLimit()
                            model.get(model.channelID)
                        }
                    }, l10n.get("SUBSCRIPTIONS_SHOW_LAST_THREE_DAYS"))
                ]),
            ]),

            (!!model.eventSource && model.eventSource.readyState == WebSocket.CLOSED) || model.state == states.ERROR ? m(".subscriptions-show__error", "Произошла ошибка, пересоединяемся, если не работает - перезагрузите страницу") : "",
            m(".subscriptions-show__items", model.subscriptions.map(f => {

                return m(".subscriptions-show__item", {
                    onclick: () => {
                        model.setBookmark(f.id)
                    },
                    class: model.getBookmark() == f.id ? "subscriptions-show__item--bookmarked" : ""
                }, [
                    m(".subscriptions-show__item__user", {
                        class: generateClass(f)
                    }, [
                        `${f.user} (${f.count})`,
                        m(".subscriptions-show__item__user__tooltip", `${f.user}#${f.userID}`)
                    ]),
                    m(".subscriptions-show__item__date", new Date(f.date).toLocaleString()),
                ])
            }))
        ])
    }
};