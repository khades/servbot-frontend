import m from 'mithril';
import states from '../utils/states';
import input from '../basicWidgets/components/InputComponent';
import checkbox from '../basicWidgets/components/CheckBoxComponent';
import model from './models/externalServices';
import routes from '../pageTemplate/routes';
import loading from '../basic/loading';
import l10n from '../l10n/l10n';
import channelName from '../utils/channelName';
import '../../scss/modules/_external-services.scss';

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

    route: routes.EXTERNAL_SERVICES,
    getTitle() {
        return l10n.get("EXTERNAL_SERVICES_TITLE", channelName.get(m.route.param("channel")))
    },
    view(vnode) {
        if (model.state == states.LOADING) {
            return m(loading)
        }
        return m(".external-services", [
            m(".external-services__header", l10n.get("EXTERNAL_SERVICES_TITLE", channelName.get(m.route.param("channel")))),
            m(".external-services__subheader", l10n.get("EXTERNAL_SERVICES_VKGROUP")),
            m(input, {
                label: l10n.get("EXTERNAL_SERVICES_VKGROUP_NAME"),
                class: "external-services__vk-group-input",
                id: "vkGroupInput",
                getValue: () => {
                    return !!model.object.vkGroupInfo ? model.object.vkGroupInfo.groupName : ""
                },
                setValue: (value) => {
                    !!model.object.vkGroupInfo ? model.object.vkGroupInfo.groupName = value : model.object.vkGroupInfo = {
                        groupName: value
                    }
                }
            }),
            m(checkbox, {
                id: "vkGroupAlertEnabled",
                getValue: () => !!model.object.vkGroupInfo ? model.object.vkGroupInfo.notifyOnChange : false,
                setValue: value => {
                    !!model.object.vkGroupInfo ? model.object.vkGroupInfo.notifyOnChange = value : model.object.vkGroupInfo = {
                        notifyOnChange: value
                    }
                },
                label: l10n.get("EXTERNAL_SERVICES_VKGROUP_NOTIFY")
            }), !!model.object.vkGroupInfo && !!model.object.vkGroupInfo.lastMessageBody ? [
                m(".external-services__subheader", l10n.get("EXTERNAL_SERVICES_VKGROUP_LAST_MESSAGE")),
                m(".external-services__vk-message-body", model.object.vkGroupInfo.lastMessageBody),
            ] : "",
            m('button', {
                onclick: () => {
                    model.saveVK()
                }
            }, l10n.get("SAVE")),
            m(".external-services__subheader", l10n.get("EXTERNAL_SERVICES_TWITCHDJ")),
            m(input, {
                label: l10n.get("EXTERNAL_SERVICES_TWITCHDJ_ID"),
                class: "external-services__twitch-dj-input",
                id: "twitchDJid",
                getValue: () => {
                    return !!model.object.twitchDJ ? model.object.twitchDJ.id : ""
                },
                setValue: (value) => {
                    !!model.object.twitchDJ ? model.object.twitchDJ.id = value : model.object.twitchDJ = {
                        id: value
                    }
                }
            }),
            m(checkbox, {
                id: "TwitchDJAlertEnabled",
                getValue: () => !!model.object.twitchDJ ? model.object.twitchDJ.notifyOnChange : false,
                setValue: value => {
                    !!model.object.twitchDJ ? model.object.twitchDJ.notifyOnChange = value : model.object.twitchDJ = {
                        notifyOnChange: value
                    }
                },
                label: l10n.get("EXTERNAL_SERVICES_TWITCHDJ_NOTIFY")
            }),
            m('button', {
                onclick: () => {
                    model.saveTwitchDJ()
                }
            }, l10n.get("SAVE")),
        ])
    }
};