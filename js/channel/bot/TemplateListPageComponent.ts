import * as m from "mithril"

import { PageTemplateComponent } from '../../pageTemplate/PageTemplateComponent'
import { TemplateListModel } from './models/TemplateListModel'
import { TemplateListComponent } from "./components/TemplateListComponent"
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

export { TemplateListPageComponent }