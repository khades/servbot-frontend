import auth from '../../utils/auth'
import appUrl from '../../utils/appUrl'
import states from '../../utils/states'
import m from 'mithril'
import time from '../../utils/time'
import l10n from '../../l10n/l10n'
import listModel from "./list"
import notifications from "../../notifications/notifications"

export default {
    state: states.READY,
    template: null,
    channelID: "",
    isAlias: false,
    name: "",
    errorTemplate: false,

    get: function (channelID, name) {
        if (listModel.channelID != channelID) {
            listModel.init(channelID)
        }
        this.extended = false
        this.state = states.LOADING
        this.channelID = channelID
        this.name = name
        this.route = m.route.get()
        auth.request({
            url: appUrl(`api/channel/${channelID}/templates/${name}`)
        }).then(response => {
            if (!!response) {

                this.template = response

                this.isAlias = !(response.aliasTo == "" || response.commandName == response.aliasTo)

                // if (response.integerRandomizer.enabled == false &&
                //     response.preventDebounce == false &&
                //     response.preventRedirect == false &&
                //     response.stringRandomizer.enabled == false) {
                //     this.extended = false
                // } else {
                //     this.extended = true
                // }


            }
            this.state = states.READY
        })
    },
    save() {
        this.state = states.LOADING
        this.errorTemplate = false
        auth.request({
            url: appUrl(`api/channel/${this.template.channelID}/templates/${this.template.commandName}`),
            method: "POST",
            data: this.template
        }).then(response => {
            notifications.addNotification(l10n.get("SAVE_SUCCESSFULL"))

            this.get(this.template.channelID, this.template.commandName)
            this.state = states.READY
        }).catch(error => {
            if (error.code == 422) {
                this.errorTemplate = true
                notifications.addNotification(l10n.get("TEMPLATE_BODY_ERROR"))
            }
            this.state = states.READY

        })
    },
    setAliasTo() {
        this.state = states.LOADING
        this.errorTemplate = false

        auth.request({
            url: appUrl(`api/channel/${this.template.channelID}/templates/${this.template.commandName}/setAliasTo`),
            method: "POST",
            data: {
                aliasTo: this.template.aliasTo
            },
            background: true
        }).then(response => {
            notifications.addNotification(l10n.get("SAVE_SUCCESSFULL"))

            this.get(this.template.channelID, this.template.commandName)
            this.state = states.READY
        })

    }
}