import * as m from "mithril"

import PageTemplateComponent from '../pageTemplate/PageTemplateComponent'
import LogUsersPageModel from "./models/LogUsersPageComponent"
import LogUsersComponent from "./components/LogUsersComponent"
var LogUsersPageComponent = {
    oninit: function (vnode) {
        LogUsersPageModel.init(vnode.attrs.channel)
    },
    onupdate: function (vnode) {
        if (m.route.get() != LogUsersPageModel.route) {
            LogUsersPageModel.init(vnode.attrs.channel)
        }
    },
    view: function (vnode) {
        return m(PageTemplateComponent, {
            route: "logs",
            title: `Список пользователей на канале ${vnode.attrs.channel}`,
            content: m(LogUsersComponent)

        })
    }
}
export default LogUsersPageComponent 