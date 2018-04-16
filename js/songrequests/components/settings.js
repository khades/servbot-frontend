import m from 'mithril'
import model from '../models/model'
import input from '../../basicWidgets/components/InputComponent'
import l10n from '../../l10n/l10n'
import check from '../../basicWidgets/components/CheckBoxComponent'
import notifications from '../../notifications/notifications'

export default {
    view() {
        var settings = model.songrequestInfo.settings
        return m(".songrequests__settings", [
            m(check, {
                id: "onlySubs",
                getValue: () => model.songrequestInfo.settings.onlySubs,
                setValue: value => {

                    model.songrequestInfo.settings.onlySubs = value
                },
                label: l10n.get("SONGREQUESTS_SUBS_ONLY")
            }),
            m(input, {
                label: l10n.get("SONGREQUESTS_PLAYLIST_LENGTH"),
                id: "playlistLength",
                getValue: () => {
                    return model.songrequestInfo.settings.playlistLength
                },
                setValue: (value) => {
                    model.songrequestInfo.settings.playlistLength = parseInt(value.trim())
                    m.redraw()

                }
            }),
            m(input, {
                label: l10n.get("SONGREQUESTS_MAX_VIDEO_LENGTH"),
                id: "playlistLength",
                getValue: () => {
                    return model.songrequestInfo.settings.maxVideoLength
                },
                setValue: (value) => {
                    model.songrequestInfo.settings.maxVideoLength = parseInt(value.trim())
                    m.redraw()

                }
            }),
            m(input, {
                label: l10n.get("SONGREQUESTS_MAX_REQUESTS_PER_USER"),
                id: "maxRequestsPerUser",
                getValue: () => {
                    return model.songrequestInfo.settings.maxRequestsPerUser
                },
                setValue: (value) => {
                    model.songrequestInfo.settings.maxRequestsPerUser = parseInt(value.trim())
                    m.redraw()

                }
            }),
            m(input, {
                label: l10n.get("SONGREQUESTS_MINIMAL_AMOUNT_OF_VIEWS"),
                id: "videoViewLimit",
                getValue: () => {
                    return model.songrequestInfo.settings.videoViewLimit
                },
                setValue: (value) => {
                    model.songrequestInfo.settings.videoViewLimit = parseInt(value.trim())
                    m.redraw()
                }
            }),
            m(check, {
                id: "moreLikes",
                getValue: () => model.songrequestInfo.settings.moreLikes,
                setValue: value => {

                    model.songrequestInfo.settings.moreLikes = value
                },
                label: l10n.get("SONGREQUESTS_MORE_LIKES_THAN_DISLIKES")
            }),
            m(check, {
                id: "allowOffline",
                getValue: () => model.songrequestInfo.settings.allowOffline,
                setValue: value => {

                    model.songrequestInfo.settings.allowOffline = value
                },
                label: l10n.get("SONGREQUESTS_ALLOW_OFFLINE")
            }),
            // m(check, {
            //     id: "skipIfTagged",
            //     getValue: () => model.songrequestInfo.settings.skipIfTagged,
            //     setValue: value => {

            //         model.songrequestInfo.settings.skipIfTagged = value
            //     },
            //     label: l10n.get("SONGREQUESTS_SKIP_IF_RESTRICTED_TAG_ADDED")
            // }),
            m("button", {
                type: "button",
                onclick() {
                    model.saveSettings()
                }
            }, l10n.get("SAVE"))
        ])
    }

};