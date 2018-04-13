import model from './models/list';
import m from 'mithril';
import channelName from '../utils/channelName';
import input from '../basicWidgets/components/InputComponent';
import textarea from '../basicWidgets/textarea';
import multiinput from '../basicWidgets/multiinput';
import check from '../basicWidgets/components/CheckBoxComponent';
import states from '../utils/states.js';
import routes from '../pageTemplate/routes';
import loading from '../basic/loading';
import l10n from '../l10n/l10n';
import '../../scss/modules/_subday-list.scss';

export default {
    oninit: function (vnode) {
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"))
    },

    onupdate: function (vnode) {
        if (vnode.state.route == m.route.get())
            return
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"))
    },
    route: routes.SUBDAY,
    getTitle() {
        return l10n.get("SUBDAYS_TITLE", channelName.get(m.route.param("channel")))
    },

    view: function (vnode) {
        if (model.state != states.READY) {
            return m(loading)
        }
        return m(".subday-list", [
            m("h1", l10n.get("SUBDAYS_TITLE", channelName.get(m.route.param("channel")))),
            m(".subday-list__items", model.objects.map(f => {
                return m(".subday-list__item", [
                    m("a.subday-list__name", {
                        class: f.isActive ? "subday-list__name--is-active" : "",
                        href: `/channel/${f.channelID}/subdays/${f.id}`,
                        oncreate: m.route.link
                    }, f.name),
                    m(".subday-list__date", new Date(f.date).toLocaleString())
                ])
            }))
        ])
    }
};