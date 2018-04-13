var m = require("mithril")
var model = require("../models/model")
require("../../../scss/modules/_songrequests-item.scss")
var cclass = "songrequests-item"
var cselector = `.${cclass}`
var l10n = require("../../l10n/l10n")
var formatDuration = require("../../utils/formatDuration")
module.exports = {
    view(vnode) {


        return m(cselector, {
            key: vnode.attrs.key
        }, [
            m(cselector + "__header", [
                m("a" + cselector + "__title", {
                        target: "_blank",
                        href: "https://youtu.be/" + vnode.attrs.item.videoID
                    },
                    vnode.attrs.item.order + " " +vnode.attrs.item.title + " [" + formatDuration(vnode.attrs.item.length / 1000000000) + "]"),
                m(cselector + "__user", vnode.attrs.item.user)
            ]),
            vnode.attrs.isMod == true || vnode.attrs.isOwner == true ? m(cselector + "__buttons", [
                model.videoID != vnode.attrs.item.videoID ? m(cselector + "__play-button", {

                    onclick() {
                        model.bubbleUp(vnode.attrs.item.videoID)
                    }
                }, l10n.get("Воспроизвести сейчас")) : null,
                model.videoID != vnode.attrs.item.videoID && vnode.attrs.item.order != 1 && vnode.attrs.item.order != 2 ? m(cselector + "__play-next-button", {

                    onclick() {
                        model.bubbleUpToSecond(vnode.attrs.item.videoID)
                    }
                }, l10n.get("Поднять в очереди")) : null,

                m(cselector + "__delete-button", {

                    onclick() {
                        model.skipVideo(vnode.attrs.item.videoID)
                    }
                }, l10n.get("Удалить из очереди")),
                m(cselector + "__delete-button", {

                    onclick() {
                        model.setAsTwitchRestrictred(vnode.attrs.item.videoID)
                    }
                }, l10n.get("Не для твитча")),

            ]) : null
        ])
    }
}