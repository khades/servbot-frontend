var m = require("mithril")
var model = require("../models/show")
require("../../../scss/modules/_subscriptions-show.scss")
module.exports = {
    view(vnode) {
        return m(".subscriptions-show", [
            m(".subscriptions-show__header", `Подписчики на канале ${model.channel}`),
            !!model.eventSource && model.eventSource.readyState == EventSource.CLOSED ? m(".subscriptions-show__error", "Произошла ошибка, пересоединяемся, если не работает - перезагрузите страницу") : m(".nothing"),
            m(".subscriptions-show__threshold", model.getLimit() == null ? `За последние три дня` : `Начиная с ${new Date(parseInt(model.getLimit())).toLocaleString() }`),
            m(".subscriptions-show__buttons", [
                m('button', {
                    onclick: () => {
                        model.setLimit()
                        model.get(model.channelID)
                    }
                }, "Отметить как прочитанное"),
                m('button', {
                    onclick: () => {
                        model.resetLimit()
                        model.get(model.channelID)
                    }
                }, "Показать последние подписки (За 3 дня)")
            ]),
            m(".subscriptions-show__items", model.subscriptions.map(f => {

                return m(".subscriptions-show__item", [
                    m(".subscriptions-show__item__user", {
                        class: f.isPrime ? "subscriptions-show__item__user--prime" : "subscriptions-show__item__user--non-prime"
                    }, [
                        `${f.user} (${f.count})`,
                        m(".subscriptions-show__item__user__tooltip", `${f.user}#${f.userID}`)
                    ]),
                    m(".subscriptions-show__item__date", new Date(f.date).toLocaleString()),
                ])
            }))
        ])
    }
}