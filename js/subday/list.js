import model from './models/list'
import m from 'mithril'
import channelName from '../utils/channelName'
import input from '../basicWidgets/input'
import textarea from '../basicWidgets/textarea'
import multiinput from '../basicWidgets/multiinput'
import check from '../basicWidgets/checkbox'
import states from '../utils/states.js'
import routes from '../pageTemplate/routes'
import loading from '../basic/loading'
import l10n from '../l10n/l10n'
import '../../scss/modules/_subday-list.scss'
import create from "./components/create"

export default {
    oninit: function (vnode) {
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"))
        vnode.state.innerroute = "list"
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
            m(".subday-list__hgroup", [
                m(".subday-list__header", l10n.get("SUBDAYS_TITLE", channelName.get(m.route.param("channel")))),
                model.objects.some(f => f.isActive == true) ? "" : [vnode.state.innerroute != "add" ? m("button.subday-list__add", {
                        type: "button",
                        onclick() {
                            vnode.state.innerroute = "add"
                        }
                    }, l10n.get("SUBDAY_CREATE")) : "",
                    vnode.state.innerroute != "list" ? m("button.subday-list__list", {
                        type: "button",
                        onclick() {
                            vnode.state.innerroute = "list"
                        }
                    }, l10n.get("SUBDAY_LIST")) : ""
                ]
            ]),

            vnode.state.innerroute == "list" ? m(".subday-list__items", model.objects.map(f => {
                return m(".subday-list__item", [
                    m("a.subday-list__name", {
                        class: f.isActive ? "subday-list__name--is-active" : "",
                        href: `/channel/${f.channelID}/subdays/${f.id}`,
                        oncreate: m.route.link
                    }, f.name),
                    m(".subday-list__date", new Date(f.date).toLocaleString())
                ])
            })) : m(create)
        ])
    }
};