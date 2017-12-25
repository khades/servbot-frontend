var model = require("../models/model")
var m = require("mithril")
var channelName = require("../../utils/channelName")
var input = require("../../basicWidgets/components/InputComponent")
var textarea = require("../../basicWidgets/textarea")
var multiinput = require("../../basicWidgets/multiinput")
var check = require("../../basicWidgets/components/CheckBoxComponent")
var states = require("../../utils/states.js")
require("../../../scss/modules/_subday.scss")
var roulette = require("../../widgets/roulette")
var getTiming = function (coord) {
    var t1 = 1
    var t2 = 1
    t1 = 1 + Math.pow(1 - coord, 1 / 2)
    t2 = 1 - Math.pow(1 - coord, 1 / 2)
    if (t1 >= 0 && t1 <= 1) {
        return t1
    }
    if (t2 >= 0 && t2 <= 1) {
        return t2
    }
};
var animationInterval = 0.5;
module.exports = {
    view: function (vnode) {

        return model.state == states.READY ?
            m(".subday", [
                m("h1", !!model.object.name ? model.object.name : ""),
                m("", model.object.isActive == true ? "Сабдей не закрыт" : "Сабдей закрыт"),
                model.object.isMod == true ?

                [
                    m.route.param("roulette") == true && model.object.isActive == true ? m(roulette, {
                        getRouletteInfo: () => {
                            return model.rouletteInfo
                        }
                    }) : "",

                    m("h1", "Победители"),
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
                            }, "Удалить победителя") : ""
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
                        }, "Зарандомить победителя"),
                        m('button', {
                            type: 'button',
                            class: model.playingRoulette == true ? "disabled" : "",

                            onclick: (event) => {
                                event.redraw = false
                                model.close()
                            }
                        }, "Закрыть сабдей"),
                        m.route.param("pineapple") == "throw" ? [m("h4", "История победителей"),
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
                m("h1", "Голоса"),
                m(".subday__votes", model.object.votes.map(f => {
                    return m(".subday__vote", [
                        m(".subday__vote-user", f.user),
                        m(".subday__vote-game", f.game)
                    ])
                }))

            ]) : null
    }
}