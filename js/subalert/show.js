import m from 'mithril';
import model from './models/show';
import historyItem from './components/historyItem';
import '../../scss/modules/_subalert-show.scss';
import input from '../basicWidgets/input';
import checkbox from '../basicWidgets/checkbox';
import channelName from '../utils/channelName';
import routes from '../pageTemplate/routes';
import l10n from '../l10n/l10n';

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

    route: routes.SUBALERT,

    getTitle() {
        return l10n.get("SUBALERTS_TITLE", channelName.get(m.route.param("channel")))

    },

    view(vnode) {
        return m(".subalert-show", [
            m("hgroup", [
                m(".subalert-show__headernm", l10n.get("SUBALERTS_TITLE", channelName.get(m.route.param("channel")))),
                model.extended == false ? m("button", {
                    type: "button",
                    onclick: () => {
                        model.extended = true
                    }
                }, l10n.get("SHOW_MORE")) : ""
            ]),
            m(".subalert-show__block", []),
            m(checkbox, {
                id: "subAlertEnabled",
                getValue: () => model.subAlert.enabled,
                setValue: value => {
                    model.subAlert.enabled = value
                },
                label: l10n.get("SUBALERTS_ENABLED")
            }),
            model.extended == true ? [
                m(".subalert-show__block", [

                    m(input, {
                        label: "Сообщение при follower",
                        class: "subalert-show__sub-message",
                        id: "followerMessage",
                        getValue: () => {
                            return model.subAlert.followerMessage
                        },
                        setValue: (value) => {
                            model.subAlert.followerMessage = value.trim()
                        }
                    })
                ]),
                m(".subalert-show__block", [

                    m(input, {
                        label: l10n.get("SUBALERTS_SUB_ALERT", "Prime"),
                        class: "subalert-show__sub-message",

                        id: "subPrimeMessage",
                        getValue: () => {
                            return model.subAlert.subPrimeMessage
                        },
                        setValue: (value) => {
                            model.subAlert.subPrimeMessage = value.trim()
                        }
                    }),
                    m(input, {
                        label: l10n.get("SUBALERTS_RESUB_ALERT", "Prime"),
                        id: "resubPrimeMessage",
                        class: "subalert-show__resub-message",
                        error: model.error.primeError ? l10n.get("INVALID_TEMPLATE") : null,
                        getValue: () => {
                            return model.subAlert.resubPrimeMessage
                        },
                        setValue: (value) => {
                            model.subAlert.resubPrimeMessage = value.trim()
                        }
                    }),
                    m(input, {
                        label: l10n.get("SUBALERTS_RESUB_ALERT_SMILES", "Prime"),
                        id: "resubPrimeSmile",
                        class: "subalert-show__repeat-body",
                        getValue: () => {
                            return model.subAlert.resubPrimeSmile
                        },
                        setValue: (value) => {
                            model.subAlert.resubPrimeSmile = value.trim()
                        }
                    })
                ]),
                m(".subalert-show__block", [

                    m(input, {
                        label: l10n.get("SUBALERTS_SUB_ALERT", "5$"),
                        class: "subalert-show__sub-message",

                        id: "subFiveMessage",
                        getValue: () => {
                            return model.subAlert.subFiveMessage
                        },
                        setValue: (value) => {
                            model.subAlert.subFiveMessage = value.trim()
                        }
                    }),
                    m(input, {
                        label: l10n.get("SUBALERTS_RESUB_ALERT", "5$"),
                        id: "resubFiveMessage",
                        class: "subalert-show__resub-message",
                        error: model.error.fiveError ? l10n.get("INVALID_TEMPLATE") : null,
                        getValue: () => {
                            return model.subAlert.resubFiveMessage
                        },
                        setValue: (value) => {
                            model.subAlert.resubFiveMessage = value.trim()
                        }
                    }),
                    m(input, {
                        label: l10n.get("SUBALERTS_RESUB_ALERT_SMILES", "5$"),
                        id: "resubFiveSmile",
                        class: "subalert-show__repeat-body",
                        getValue: () => {
                            return model.subAlert.resubFiveSmile
                        },
                        setValue: (value) => {
                            model.subAlert.resubFiveSmile = value.trim()
                        }
                    })
                ]),
                m(".subalert-show__block", [

                    m(input, {
                        label: l10n.get("SUBALERTS_SUB_ALERT", "$10"),
                        class: "subalert-show__sub-message",

                        id: "subTenMessage",
                        getValue: () => {
                            return model.subAlert.subTenMessage
                        },
                        setValue: (value) => {
                            model.subAlert.subTenMessage = value.trim()
                        }
                    }),
                    m(input, {
                        label: l10n.get("SUBALERTS_RESUB_ALERT", "$10"),
                        id: "resubTenMessage",
                        class: "subalert-show__resub-message",
                        error: model.error.tenError ? l10n.get("INVALID_TEMPLATE") : null,
                        getValue: () => {
                            return model.subAlert.resubTenMessage
                        },
                        setValue: (value) => {
                            model.subAlert.resubTenMessage = value.trim()
                        }
                    }),
                    m(input, {
                        label: l10n.get("SUBALERTS_RESUB_ALERT_SMILES", "$10"),
                        id: "resubTenSmile",
                        class: "subalert-show__repeat-body",
                        getValue: () => {
                            return model.subAlert.resubTenSmile
                        },
                        setValue: (value) => {
                            model.subAlert.resubTenSmile = value.trim()
                        }
                    })
                ]),
                m(".subalert-show__block", [

                    m(input, {
                        label: l10n.get("SUBALERTS_SUB_ALERT", "$25"),
                        class: "subalert-show__sub-message",

                        id: "subTwentyFiveMessage",
                        getValue: () => {
                            return model.subAlert.subTwentyFiveMessage
                        },
                        setValue: (value) => {
                            model.subAlert.subTwentyFiveMessage = value.trim()
                        }
                    }),



                    m(input, {
                        label: l10n.get("SUBALERTS_RESUB_ALERT", "$25"),
                        id: "resubTwentyFiveMessage",
                        class: "subalert-show__resub-message",
                        error: model.error.twentyFiveError ? l10n.get("INVALID_TEMPLATE") : null,
                        getValue: () => {
                            return model.subAlert.resubTwentyFiveMessage
                        },
                        setValue: (value) => {
                            model.subAlert.resubTwentyFiveMessage = value.trim()
                        }
                    }),
                    m(input, {
                        label: l10n.get("SUBALERTS_RESUB_ALERT_SMILES", "$25"),
                        id: "resubTwentyFiveSmile",
                        class: "subalert-show__repeat-body",
                        getValue: () => {
                            return model.subAlert.resubTwentyFiveSmile
                        },
                        setValue: (value) => {
                            model.subAlert.resubTwentyFiveSmile = value.trim()
                        }
                    })
                ])
            ] : [
                m(".subalert-show__block", [

                    m(input, {
                        label: l10n.get("SUBALERTS_FOLLOWER_ALERT"),
                        class: "subalert-show__sub-message",

                        id: "followerMessage",
                        getValue: () => {
                            return model.subAlert.followerMessage
                        },
                        setValue: (value) => {
                            model.subAlert.followerMessage = value.trim()
                        }
                    })
                ]),
                m(".subalert-show__block", [

                    m(input, {
                        label: l10n.get("SUBALERTS_SUB_ALERT", "$5"),
                        class: "subalert-show__sub-message",

                        id: "subFiveMessage",
                        getValue: () => {
                            return model.subAlert.subFiveMessage
                        },
                        setValue: (value) => {
                            model.subAlert.subFiveMessage = value.trim()
                        }
                    }),
                    m(input, {
                        label: l10n.get("SUBALERTS_RESUB_ALERT", "$5"),
                        id: "resubFiveMessage",
                        class: "subalert-show__resub-message",
                        error: model.error.fiveError ? l10n.get("INVALID_TEMPLATE") : null,
                        getValue: () => {
                            return model.subAlert.resubFiveMessage
                        },
                        setValue: (value) => {
                            model.subAlert.resubFiveMessage = value.trim()
                        }
                    }),
                    m(input, {
                        label: l10n.get("SUBALERTS_RESUB_ALERT_SMILES", "$5"),
                        id: "resubFiveSmile",
                        class: "subalert-show__repeat-body",
                        getValue: () => {
                            return model.subAlert.resubFiveSmile
                        },
                        setValue: (value) => {
                            model.subAlert.resubFiveSmile = value.trim()
                        }
                    })
                ])
            ],
            m("button", {
                type: "button",
                onclick: () => {
                    model.save()
                }
            }, l10n.get("SAVE")), , !!model.subAlert.history ? m(".subalert-show__header", l10n.get("SUBALERTS_EDIT_HISTORY")) : "", !!model.subAlert.history ? m(".subalert-show__history", model.subAlert.history.map(f => {
                f.extended = model.isExtended(f)
                return m(historyItem, f)
            })) : ""
        ])
    }
};