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
            TemplateListModel.init(vnode.attrs.channel)
        }
    },
    view: function (vnode) {
        return m(PageTemplateComponent, {
            route: "templates",
            title: `Кастомные команды для канала ${vnode.attrs.channel}`,
            content: m(TemplateListComponent)
        })
    }
}

module.exports = TemplateListPageComponent