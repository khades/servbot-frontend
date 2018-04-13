import m from 'mithril';
import TemplateModel from './TemplateModel';
import ConfigURL from '../../utils/appUrl';
import states from '../../utils/states';
import auth from '../../utils/auth';

export default {
    state: states.LOADING,
    showAll: false,
    templates: [],
    channelID: "",
    channel: "",
    route: "",
    newCommand: "",
    isMod: false,
    getTemplates() {
        if (this.showAll == true) {
            return this.templates.sort((a, b) => {
                if (a.command.commandName < b.command.commandName) return -1;
                if (a.command.commandName > b.command.commandName) return 1;
                return 0;
            })
        }
        var filter = []

        var result = this.templates.filter(f => {
            return f.command.template != ""
        } ).sort((a, b) => {
            if (a.command.commandName < b.command.commandName) return -1;
            if (a.command.commandName > b.command.commandName) return 1;
            return 0;
        })
        return result
    },
    init: function (channelID) {
        this.route = m.route.get()
        this.channelID = channelID
        auth.request({
            method: "GET",
            url: ConfigURL(`/api/channel/${channelID}/templates`)
        }).then(response => {
            if (!!response) {
                this.templates = response.templates.map(f => new TemplateModel(f))
            } else {
                this.templates = []
            }

            this.isMod = response.isMod
            this.state = states.READY
        })
    }
};