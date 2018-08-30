import m from 'mithril';
import model from './models/list';
import listItem from './components/listItem';
import '../../scss/modules/_automessage-list.scss';
import channelName from '../utils/channelName';
import routes from '../pageTemplate/routes';
import l10n from '../l10n/l10n';
import states from '../utils/states';
import loading from '../basic/loading';

export default {
    oninit: function (vnode) {
        model.state = states.LOADING
        vnode.state.showEmpty = false
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

    route: routes.AUTOMESSAGES,
    getTitle() {
        return l10n.get("AUTOMESSAGES_TITLE", channelName.get(m.route.param("channel")))

    },
    view(vnode) {
        if (model.state == states.LOADING) {
            return m(loading)
        }
        return m(".automessage-list", [
            m("hgroup", [
                m(".automessage-list__header", l10n.get("AUTOMESSAGES_TITLE", channelName.get(m.route.param("channel")))),
                m(".automessage-list__buttons", [
                    m("a.automessage-list__create", {
                        oncreate: m.route.link,
                        href: `/channel/${model.channelID}/autoMessages/new`
                    }, l10n.get("AUTOMESSAGES_CREATE_NEW")),
                    m("button", {
                        type: "button",
                        onclick: (event) => {
                            if (vnode.state.showEmpty == false) {
                                vnode.state.showEmpty = true

                            } else {
                                vnode.state.showEmpty = false
                            }
                        }
                    }, vnode.state.showEmpty == false ? l10n.get("AUTOMESSAGES_SHOW_ALL") : l10n.get("AUTOMESSAGES_SHOW_ACTIVE"))
                    // m("button", {
                    //     type: "button",
                    //     onclick: (event) => {
                    //         event.redraw = false
                    //         model.removeInactive()
                    //     }
                    // }, l10n.get("AUTOMESSAGES_DELETE_INACTIVE"))
                ]),
            ]),

            m(".automessage-list__items", !!model.objects ? model.objects.filter(f => {
                return vnode.state.showEmpty == true ? true : f.message != ""
            }).map(f => m(listItem, f)) : "")
        ])
    }
};