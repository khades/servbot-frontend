var m = require("mithril")
var model = require("../models/model")
require("../../../scss/modules/_songrequests-item.scss")
var cclass = "songrequests-item"
var cselector = `.${cclass}`

function formDuration(input) {
    var floatSeconds = input / 1000000000
    var hours = Math.floor(floatSeconds / 3600)
    var minutes = Math.floor(floatSeconds / 60 - hours * 60)
    var seconds = floatSeconds - minutes * 60
    var result = seconds
    if (seconds < 10) {
        result = "0" + seconds
    }
    if (minutes < 10) {
        result = "0" + minutes + ":" + result
    } else {
        result = minutes + ":" + result
    }
    if (hours > 0) {
        result = hours + ":" + result
    }
    return result
}
module.exports = {
    view(vnode) {


        return m(cselector, {
            key: vnode.attrs.key
        }, [
            m(cselector + "__user", vnode.attrs.item.order + " " + vnode.attrs.item.user),
            m("a" + cselector + "__title", {
                    target: "_blank",
                    href: "https://youtu.be/" + vnode.attrs.item.videoID
                },
                vnode.attrs.item.title + " [" + formDuration(vnode.attrs.item.length) + "]"),
            vnode.attrs.isMod == true || vnode.attrs.isOwner == true ? m(cselector + "__buttons", [
                model.videoID != vnode.attrs.item.videoID ? m('button.white', {
                    type: "button",
                    onclick() {
                        model.bubbleUp(vnode.attrs.item.videoID)
                    }
                }, "Воспроизвести сейчас") : null,
                model.videoID != vnode.attrs.item.videoID && vnode.attrs.item.order != 1 && vnode.attrs.item.order != 2 ? m('button.white', {
                    type: "button",
                    onclick() {
                        model.bubbleUpToSecond(vnode.attrs.item.videoID)
                    }
                }, "Воспроизвести следующим") : null,
                m('button.white', {
                    type: "button",
                    onclick() {
                        model.skipVideo(vnode.attrs.item.videoID)
                    }
                }, "Удалить из очереди"),
            ]) : null
        ])
    }
}