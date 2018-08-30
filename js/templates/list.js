import m from 'mithril';
import '../../scss/modules/_template-list.scss';
import model from './models/list';
import TemplateListItemComponent from './components/TemplateListItemComponent';
import input from '../basicWidgets/input';
import channelName from '../utils/channelName';
import routes from '../pageTemplate/routes';
import l10n from '../l10n/l10n';
import loading from '../basic/loading';
import states from '../utils/states.js';

export default {

    oninit: function (vnode) {
        model.state = states.LOADING
        vnode.state.tab = "list"
        model.showAll = false
        vnode.state.route = m.route.get()
        model.init(m.route.param("channel"))
    },
    onupdate: function (vnode) {
        
        if (vnode.state.route == m.route.get())
            return
        model.state = states.LOADING
        vnode.state.tab = "list"
        vnode.state.route = m.route.get()
        model.init(m.route.param("channel"))
    },
    route: routes.TEMPLATES,
    getTitle: () => {
        return l10n.get("TEMPLATES_TITLE", channelName.get(m.route.param("channel")))
    },
    view: function (vnode) {
        if (model.state == states.LOADING) {
            return m(loading)
        }
        return m(".template-list", [
            m("hgroup.template-list__hgroup", [
                m(".template-list__header", l10n.get("TEMPLATES_TITLE", channelName.get(m.route.param("channel")))),
                m(".template-list__header-buttons", [
                    model.isMod ? m(".template-list__header-button", {
                            class: vnode.state.tab == "list" ? "template-list__header-button--create" : "template-list__header-button--list",
                            onclick: () => {
                                if (vnode.state.tab == "list") {
                                    vnode.state.tab = "create"
                                } else {
                                    vnode.state.tab = "list"
                                }
                            },

                        },
                        vnode.state.tab == "list" ? l10n.get("TEMPLATES_NEW") : l10n.get("TEMPLATES_LIST")) : null,
                    vnode.state.tab == "list" ? m(".template-list__header-button", {
                        onclick: () => {
                            if (model.showAll == true) {
                                model.showAll = false
                            } else {
                                model.showAll = true
                            }
                        },
                    }, model.showAll == true ? l10n.get("TEMPLATES_SHOW_ACTIVE") : l10n.get("TEMPLATES_SHOW_ALL")) : null
                ]),
            ]),

            vnode.state.tab == "list" ? m(".template-list__container", model.getTemplates().map(f => m(TemplateListItemComponent, {
                item: f,
                isMod: model.isMod
            }))) : null,
            model.isMod && vnode.state.tab == "create" ? [
                m(input, {
                    label: l10n.get("TEMPLATES_CREATE_GOTO"),
                    id: "newCommand",
                    getValue: () => {
                        return model.newCommand
                    },
                    setValue: (value) => {
                        model.newCommand = value.trim()
                        m.redraw()
                    }
                }),
                m("a.template-list__goto-command", {
                    oncreate: m.route.link,
                    href: `/channel/${model.channelID}/templates/${model.newCommand}`
                }, m("button", l10n.get("PROCEED"))),
            ] : null


        ])

    }
};