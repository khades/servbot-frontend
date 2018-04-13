import m from 'mithril';
import model from './models/notifications';
import component from './components/notifications';
import '../../scss/modules/_notifications.scss';
var timeout = 10000

function func() {

    var date = new Date().getTime()
    var redrawAfter = false
    var startingLength = model.notifications.length

    var filteredArray = model.notifications.filter(f => {
        return date - f.date.getTime() < timeout
    })
    if (startingLength != filteredArray.length) {
        redrawAfter = true
        model.notifications = filteredArray
    }
    if (redrawAfter == true) {
        m.redraw()
    }
}

setInterval(func, 1000)

var notificationItem = {
    onbeforeremove: function (vnode) {
        vnode.dom.classList.add('notifications__item--hidden')
        return new Promise(function (resolve) {
            setTimeout(resolve, 500)
        })
    },
    view(vnode) {
        return m('.notifications__item', {
            key: vnode.attrs.key,
            onclick: (event) => {
                vnode.attrs.remove()
            }
        }, vnode.attrs.body)
    }
}

export default {
    addNotification(text, id) {
        if (!!id) {
            model.addNotification(text, id)

        } else {
            model.addNotification(text)

        }
    },
    view(vnode) {
        return m(".notifications", {

            },
            model.notifications.map((text, id) => m(notificationItem, {
                body: text.body,
                key: text.date.getTime(),
                remove: () => {
                    model.notifications.splice(id, 1)
                }
            })))
    }
};