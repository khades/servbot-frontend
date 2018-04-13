import m from 'mithril';
import '../../scss/modules/_roulette.scss';

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

export default {
    view(rootvnode) {
        var rouletteInfo = rootvnode.attrs.getRouletteInfo()
        var animationInterval = rouletteInfo.animationInterval
        return m(".roulette", {}, [
            m('audio.roulette__audio', {
                    oncreate(vnode) {
                        rootvnode.state.audiodiv = vnode.dom
                        vnode.dom.pause()
                    }
                },
                m("source", {
                    "src": "click.ogg",
                    "type": "audio/ogg"
                })
            ),
            m(".roulette__items", {
                oninit: vnode => {
                    vnode.state.date = rouletteInfo.date
                },
                onupdate: vnode => {
                    if (vnode.state.date != rouletteInfo.date) {
                        vnode.dom.style.transitionDuration = "0s"
                        vnode.dom.style.transform = "translateX(0)"
                        setTimeout(function () {
                            vnode.dom.style.transitionDuration = `${animationInterval * rouletteInfo.winner}s`
                            vnode.dom.style.transform = `translateX(${-200*(rouletteInfo.winner)}px)`
                        }, 40)
                        vnode.state.date = rouletteInfo.date
                    }
                }
            }, rouletteInfo.items.map((f, index) => {
                return m(".roulette__item", {
                    key: index + rouletteInfo.date,
                    oncreate: vnode => {
                        vnode.state.date = rouletteInfo.date
                        if (index < rouletteInfo.winner && rouletteInfo.items.length > 1) {
                            var timingOffset = getTiming(index / (rouletteInfo.winner)) * (animationInterval * rouletteInfo.winner - 1) * 1000
                            setTimeout(function () {
                                vnode.dom.classList.add("roulette__item--lost")
                                rootvnode.state.audiodiv.play()
                            }, timingOffset)
                        }

                        if (index == rouletteInfo.winner && rouletteInfo.items.length > 1) {
                            setTimeout(function () {
                                vnode.dom.classList.add("roulette__item--won")
                                rootvnode.state.audiodiv.play()

                            }, (rouletteInfo.winner) * 1000 * animationInterval)
                        }

                    },
                    onupdate: vnode => {
                        if (vnode.state.date != rouletteInfo.date) {
                            vnode.dom.classList.remove("roulette__item--lost")
                            vnode.dom.classList.remove("roulette__item--won")

                            if (index < rouletteInfo.winner && rouletteInfo.items.length > 1) {
                                var timingOffset = getTiming(index / (rouletteInfo.winner)) * (animationInterval * rouletteInfo.winner - 1) * 1000
                                setTimeout(function () {
                                    vnode.dom.classList.add("roulette__item-lost")
                                    rootvnode.state.audiodiv.play()

                                }, timingOffset)
                            }

                            if (index == rouletteInfo.winner && rouletteInfo.items.length > 1) {
                                setTimeout(function () {
                                    vnode.dom.classList.add("roulette__item--won")
                                    rootvnode.state.audiodiv.play()

                                }, (rouletteInfo.winner) * 1000 * animationInterval)
                            }

                            vnode.state.date = rouletteInfo.date
                        }
                    }
                }, [
                    m(".roulette__item-header", f.header),
                    m(".roulette__item-footer", f.footer)
                ])
            }))
        ])
    }
};