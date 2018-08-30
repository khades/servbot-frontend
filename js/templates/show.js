import m from 'mithril';
import model from './models/show';
import historyItem from './components/historyItem';
import '../../scss/modules/_template-show.scss';
import textarea from '../basicWidgets/textarea';

import states from '../utils/states.js';
import routes from '../pageTemplate/routes';
import channelName from '../utils/channelName';
import l10n from '../l10n/l10n';
import select from '../basicWidgets/select';
import listModel from "./models/list"
import loading from '../basic/loading';

export default {
    oninit: function (vnode) {
        model.state = states.LOADING
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"), m.route.param("template"))

    },
    onupdate: function (vnode) {
        if (vnode.state.route == m.route.get())
            return
        model.state = states.LOADING
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"), m.route.param("template"))

    },
    route: routes.TEMPLATES,
    getTitle() {
        return l10n.get("TEMPLATE_TITLE", m.route.param("template"), channelName.get(m.route.param("channel")))
    },
    view(vnode) {
        if (model.state == states.LOADING) {
            return m(loading)
        }
        var currentPanel = "template"
        if (model.state == states.READY) {
            if (vnode.state.isAlias == true || (vnode.state.isAlias == null && model.isAlias == true)) {
                currentPanel = "alias"
            }

        }
        return model.state == states.READY ? m(".template-show", [


            m(".template-show__block", [
                m("hgroup.template-show__hgroup", [


                    m(".template-show__header-nm", l10n.get("TEMPLATE_TITLE", m.route.param("template"), channelName.get(m.route.param("channel")))),
                    currentPanel == "template" ? m("button", {
                        type: "button",
                        onclick: () => {
                            vnode.state.isAlias = true
                        }
                    }, l10n.get("TEMPLATE_TO_ALIAS")) : m("button", {
                        type: "button",
                        onclick: () => {
                            vnode.state.isAlias = false
                        }
                    }, l10n.get("TEMPLATE_TO_NORMAL")),
                ]), 
                model.isAlias == true ? l10n.get("ALIAS_TO", model.template.aliasTo) : null,

            ]),
            currentPanel == "template" ? [m(textarea, {
                    label: l10n.get("TEMPLATE_MESSAGE"),
                    id: "newCommand",
                    error: model.errorTemplate ? l10n.get("INVALID_TEMPLATE") : null,
                    getValue: () => {
                        return model.template.template
                    },
                    setValue: (value) => {
                        model.template.template = value.trim()
                    }
                }),
                m(".template-show__buttons", [
                    m("button", {
                        type: "button",
                        onclick: () => {
                            model.save()
                        }
                    }, l10n.get("SAVE")),
                    m("button", {
                        type: "button",
                        onclick: () => {
                            model.template.template = ""
                            vnode.state.isAlias = null

                            model.save()
                        }
                    }, l10n.get("TEMPLATE_DELETE"))
                ])
            ] : [
                m(select, {
                    label: l10n.get("TEMPLATE_ALIAS_TO"),
                    id: "newCommand",
                    oninit() {
                        console.log("select init")
                    },
                    getOptions() {
                        return listModel.templates.filter(item => {
                            console.log(item.command)
                            if (item.command.template.trim() == "") {
                                return false
                            }
                            if (item.command.commandName == item.command.aliasTo || item.command.aliasTo == "") {
                                return true

                            }
                            return false
                        }).map(item => {
                            return {
                                value: item.command.commandName
                            // ,
                            //     label: item.command.commandName + " -- " + item.command.template
                            }
                        })
                    },
                    getValue() {
                        return model.template.aliasTo
                    },
                    setValue(value) {
                        model.template.aliasTo = value.trim()
                    }
                }),
                model.isAlias && model.template.template.trim() != "" ? m('.template-show__original-body', l10n.get("TEMPLATE_COMMAND_BODY")+": " + model.template.template) : null,
                m(".template-show__buttons", [
                    m("button", {
                        type: "button",
                        onclick: () => {
                            model.setAliasTo()
                            vnode.state.isAlias = null
                        }
                    }, l10n.get("SAVE")), model.isAlias ? m("a", {
                        oncreate: m.route.link,
                        href: `/channel/${model.template.channelID}/templates/${model.template.aliasTo}`
                    }, m("button", l10n.get("TEMPLATE_GO_TO_ORIGINAL"))) : "",
                ]),
            ], !!model.template.history ? m(".template-show__block", [
                m(".template-show__header", l10n.get("TEMPLATE_EDIT_HISTORY")),
                m(".template-show__history", model.template.history.map(f => m(historyItem, f)))
            ]) : null
        ]) : null
    }
};