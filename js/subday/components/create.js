import m from "mithril"
import input from "../../basicWidgets/input"
import checkbox from "../../basicWidgets/checkbox"
import l10n from '../../l10n/l10n'
import auth from '../../utils/auth'
import appUrl from '../../utils/appUrl'
import notifications from "../../notifications/notifications"

export default {
    oninit(vnode) {
        vnode.state.model = {
            name: "",
            subsOnly: true
        }
    },
    view(vnode) {
        return m(".subday-list__create", [
            m(input, {
                label: l10n.get("SUBDAY_NAME"),
                id: "name",

                getValue: () => {
                    return vnode.state.model.name
                },
                setValue: (value) => {
                    vnode.state.model.name = value
                }
            }),
            m(checkbox, {
                id: "allowNonSubs",
                getValue: () => vnode.state.model.subsOnly == false,
                setValue: value => {
                    if (value == true) {
                        vnode.state.model.subsOnly = false 
                    } else {
                        vnode.state.model.subsOnly = true 
                    }
                },
                label: l10n.get("SUBDAY_ALLOW_NON_SUBS")
            }),
            m("button", {
                type: "button",
                onclick()  {
                    console.log("CLICK")
                    auth.request({
                        url: appUrl(`api/channel/${m.route.param("channel")}/subdays/new`),
                        method: "POST",
                        data: vnode.state.model
                    }).then(then => {
                        m.route.set(`/channel/${m.route.param("channel")}/subdays/last`)
                        notifications.addNotification(l10n.get("CREATE_SUCCESSFULL"))

                    }).catch(error => {
                        notifications.addNotification(l10n.get("SUBDAY_ALREADY_ACTIVE"))
                    })
                }
            }, l10n.get("CREATE"))
        ])
    }
}