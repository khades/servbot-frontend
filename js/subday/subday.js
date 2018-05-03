import model from './models/model'
import m from 'mithril'
import channelName from '../utils/channelName'
import input from '../basicWidgets/input'
import textarea from '../basicWidgets/textarea'
import multiinput from '../basicWidgets/multiinput'
import check from '../basicWidgets/checkbox'
import states from '../utils/states.js'
import '../../scss/modules/_subday.scss'
import roulette from '../widgets/roulette'
import routes from '../pageTemplate/routes'
import loading from '../basic/loading'
import l10n from '../l10n/l10n'

export default {
    oninit: function (vnode) {
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"), m.route.param("subdayID"))

    },
    onupdate: function (vnode) {
        if (vnode.state.route == m.route.get())
            return
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"), m.route.param("subdayID"))

    },
    route: routes.SUBDAY,
    getTitle() {
        return !model.object.name ? model.object.name : ""
    },


    view: function (vnode) {
        if (model.state == states.LOADING) {
            return m(loading)
        }
        return m(".subday", [
            m(".subday__hgroup", [
                m(".subday__header", !!model.object.name ? model.object.name : ""), !!model.object.closer && model.object.closer != "" ? m("", l10n.get("SUBDAY_IS_CLOSED_BY", model.object.closer)) : m("", model.object.isActive == true ? l10n.get("SUBDAY_IS_ACTIVE") : l10n.get("SUBDAY_IS_CLOSED")),

            ]),

            model.object.isMod == true ?

            [
                m.route.param("roulette") == true && model.object.isActive == true ? m(roulette, {
                    getRouletteInfo: () => {
                        return model.rouletteInfo
                    }
                }) : "",

                m(".subday__subheader", l10n.get("SUBDAY_WINNERS")),
                m(".subday__winners", model.object.winners.map(f => {
                    return m(".subday__winner", [
                        m(".subday__winner-user", f.user),
                        m(".subday__winner-game", f.game),
                        model.object.isActive == true ? m('button', {
                            class: model.playingRoulette == true ? "disabled" : "",
                            type: 'button',
                            onclick: (event) => {
                                event.redraw = false
                                model.pullWinner(f.user)
                            }
                        }, l10n.get("SUBDAY_REMOVE_WINNER")) : ""
                    ])

                })),
                model.object.isActive == true ? m(".subday__buttons", [

                    m('button', {
                        type: 'button',
                        class: model.playingRoulette == true ? "disabled" : "",

                        onclick: (event) => {

                            event.redraw = false
                            model.randomize(m.route.param("roulette") == true)
                        }
                    }, l10n.get("SUBDAY_RANDOMIZE_WINNER")),
                    m('button', {
                        type: 'button',
                        class: model.playingRoulette == true ? "disabled" : "",

                        onclick: (event) => {
                            event.redraw = false
                            model.close()
                        }
                    }, l10n.get("SUBDAY_CLOSE")),
                    m.route.param("pineapple") == "throw" ? [m("h4", l10n.get("SUBDAY_WINNERS_HISTORY")),
                        model.object.winnersHistory.map(f => {
                            return [
                                m("h5", new Date(f.date).toLocaleString()),
                                m(".subday__votes", f.winners.map(r => {
                                    return m(".subday__vote", [
                                        m(".subday__vote-user", r.user),
                                        m(".subday__vote-game", r.game)
                                    ])
                                }))
                            ]
                        })
                    ] : null

                ]) : null
            ]

            :
            null,
            m(".subday__subheader", l10n.get("SUBDAY_VOTES")),
            m(".subday__votes", model.object.votes.map(f => {
                return m(".subday__vote", [
                    m(".subday__vote-user", f.user),
                    m(".subday__vote-game", f.game)
                ])
            }))

        ])
    }
};