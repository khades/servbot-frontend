import m from 'mithril';
import model from './models/users';
import '../../scss/modules/_channel-users.scss';
import input from '../basicWidgets/input';
import channelName from '../utils/channelName';
import routes from '../pageTemplate/routes';
import l10n from '../l10n/l10n';
import notifications from '../notifications/notifications';

export default {
    oninit: function (vnode) {

        notifications.addNotification(l10n.get("USER_LIST_TOP_100_SHOWN"), "USER_LIST_TOP_100_SHOWN")


        vnode.state.route = m.route.get()
        model.init(m.route.param("channel"))
    },

    onupdate: function (vnode) {
        localStorage.setItem("logntshown", new Date().getTime())

        if (vnode.state.route == m.route.get())
            return
        vnode.state.route = m.route.get()
        model.init(m.route.param("channel"))
    },


    route: routes.LOGS,
    getTitle: () => {
        return l10n.get("USER_LIST", channelName.get(m.route.param("channel")))
    },
    view: function (vnode) {

        return m(".channel-users", [
            m("hgroup.channel-users__hgroup", [
                m(".channel-users__header", l10n.get("USER_LIST", channelName.get(m.route.param("channel")))),
                m(".channel-users__search-input", m("input", {
                    value: model.filter,
                    onchange: m.withAttr("value", function (value) {
                        model.setFilter(value)
                        return true
                    }),
                    placeholder: l10n.get("USER_LIST_INPUT_PLACEHOLDER")
                }))
            ]),

            !!model.results ? m(".channel-users__container", model.results.map(user => {
                return m("a.channel-users__container__user-link", {
                    oncreate: m.route.link,
                    href: "/channel/" + model.channelID + "/logs/" + user.userID
                }, [
                    m("span.channel-users__container__user-link__user", `${user.user}`)
                ])
            })) : null

        ])

    }
};