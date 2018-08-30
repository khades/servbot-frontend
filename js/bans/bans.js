import model from './models/model';
import m from 'mithril';
import states from '../utils/states.js';
import '../../scss/modules/_channel-bans.scss';
import routes from '../pageTemplate/routes';
import channelName from '../utils/channelName';
import l10n from '../l10n/l10n';
import loading from '../basic/loading';

export default {
    oninit: function (vnode) {
        model.state = states.LOADING
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"))
    },
    onupdate: function (vnode) {
        if (vnode.state.route == m.route.get())
            return
        model.state = states.LOADING
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"))
    },
    route: routes.CHANNELBANS,
    getTitle: () => {
        return l10n.get("BANS_TITLE", channelName.get(m.route.param("channel")))
    },
    view: function (vnode) {
        if (model.state == states.LOADING) {
            return m(loading)
        }
        return model.state == states.READY ?
            m(".channel-bans", [
                m(".channel-bans__page-header", l10n.get("BANS_TITLE", channelName.get(m.route.param("channel")))),
                m(".channel-bans__items", !!model.object.bans ? model.object.bans.map(f => {
                    return m("a.channel-bans__item", {
                        href: `/channel/${m.route.param("channel")}/logs/${f.userID}`,
                        oncreate: m.route.link
                    }, [
                        m(".channel-bans__header", [
                            m(".channel-bans__name", "@" + f.user),
                            m(".channel-bans__date", new Date(f.date).toLocaleString())

                        ]),
                        m(".channel-bans__duration", f.banLength == 0 ? l10n.get("BANS_PERMANENT") : l10n.get("TIME_SECONDS", f.banLength)),
                    ])
                }) : null)
            ]) : null
    }
};