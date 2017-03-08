var m = require("mithril")

var PageTemplateComponent = require('../../pageTemplate/PageTemplateComponent')
var TemplateListModel = require('./models/TemplateListModel')
var TemplateListComponent = require("./components/TemplateListComponent")
var TemplateListPageComponent = {
    oninit: function (vnode) {
        TemplateListModel.init(vnode.attrs.channel)

    },
    onupdate: function (vnode) {
        if (m.route.get() != TemplateListModel.route) {
            TemplateListModel.newCommand = ""
            TemplateListModel.init(vnode.attrs.channel)
        }
    },
    view: function (vnode) {
        return m(PageTemplateComponent, {
            getState: () => {return TemplateListModel.state},
            route: "templates",
            title: `Кастомные команды для канала ${TemplateListModel.channel}`,
            content: m(TemplateListComponent)
        })
    }
}

module.exports = TemplateListPageComponent