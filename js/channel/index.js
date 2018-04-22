import m from 'mithril';
import model from './models/index';
import states from '../utils/states';
import loading from '../basic/loading';
import routes from '../pageTemplate/routes';
import l10n from '../l10n/l10n';
import channelName from '../utils/channelName';
import '../../scss/modules/_channel-index.scss';
import select from '../basicWidgets/select'
export default {
    oninit(vnode) {
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"))
    },
    onupdate(vnode) {
        if (vnode.state.route != m.route.get()) {
            vnode.state.route = m.route.get()
            model.get(m.route.param("channel"))
        }
    },
    getTitle() {
        return l10n.get("CHANNEL_TITLE", channelName.get(m.route.param("channel")))
    },
    route: routes.CHANNEL,
    view() {
        if (model.state != states.READY) {
            return m(".channel-index", m(loading))
        }
        return m(".channel-index", [
            m(".channel-index__hgroup", [
                m(".channel-index__header", l10n.get("CHANNEL_TITLE", channelName.get(m.route.param("channel")))),
                model.channelInfo.isMod ? [
                    m("div", l10n.get("YOURE_MODERATOR", channelName.get(m.route.param("channel"))))
                ] : m("div", l10n.get("YOURE_NOT_MODERATOR", channelName.get(m.route.param("channel"))))
            ]),

            m("h1", l10n.get("AVAILABLE_CHANNELS_TO_MOD")),
            m(".channel-index__mod-channels", model.modChannels.map(f => [
                m("a.channel-index__mod-channels__channel", {
                    href: `/channel/${f.channelID}`,
                    oncreate: m.route.link
                }, f.channel)
            ])),
            m(".channel-index__language",
                m(select, {
                    label: l10n.get("LANGUAGE"),
                    id: "newCommand",
                    getValue: l10n.getLang,
                    setValue: l10n.setLang,
                    getOptions() {
                        return [{
                            value: "en",
                            label: "English"
                        }, {
                            value: "ru",
                            label: "Русский"
                        }]
                    }
                }))
        ])
    }
}