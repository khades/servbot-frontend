var m = require("mithril")
var model = require("../models/show")
require("../../../scss/modules/_subscriptions-show.scss")
module.exports = {
    view(vnode) {
        return m(".subscriptions-show", [
            m(".subscriptions-show__header", `Подписчики на канале ${model.channel}`),
            model.subscriptions.map(f => {

                return m(".subscriptions-show__item", [
                    m(".subscriptions-show__item__user", {
                        class: f.isPrime ? "subscriptions-show__item__user--prime" : "subscriptions-show__item__user--non-prime"
                    }, [
                        `${f.user} (${f.count})`,
                        m(".subscriptions-show__item__user__tooltip", `${f.user}#${f.userID}`)
                    ]),
                    m(".subscriptions-show__item__date", new Date(f.date).toLocaleString()),
                ])
            })
        ])
    }
}