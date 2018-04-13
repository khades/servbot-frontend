import m from 'mithril';
import model from './models/index';
import routes from '../pageTemplate/routes';

// require("../../scss/modules/_main-page.scss")
import l10n from '../l10n/l10n';

import user from '../pageTemplate/models/UserNameModel';

export default {
    oninit: function (vnode) {
        if (!!user.userID) {
            m.route.set(`/channel/${user.userID}`)
        }
  
    },
    onbeforeupdate: function(vnode) {
        if (!!user.userID) {
            m.route.set(`/channel/${user.userID}`)
        }
    },
    route: routes.MAIN,
    getTitle() {
        return l10n.get("MAIN_PAGE")
    },
    view(vnode) {
        // console.log("here")
        // return m(".main-page", [
        //     m(".main-page__header", l10n.get("WELCOME_TITLE")),
        //     m(".main-page__header",  l10n.get("AVAILABLE_CHANNELS_TO_MOD")),
        //     m(".main-page__mod-channels", model.object.modChannels.map(f => [
        //         m("a.main-page__mod-channels__channel", {
        //             href: `/channel/${f.channelID}`,
        //             oncreate: m.route.link
        //         }, f.channel)
        //     ]))

        // ])
    }
};