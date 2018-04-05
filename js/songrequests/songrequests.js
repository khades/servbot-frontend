var m = require("mithril")
var model = require("./models/model")
require("../../scss/modules/_songrequests.scss")
var states = require("../utils/states")
var songrequestsItem = require("./components/songrequestsItem")
var channelName = require("../utils/channelName")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")

module.exports = {
    oninit: function (vnode) {
        model.songrequestInfo = null
        model.currentVideo = null
        model.playerReady = false
        model.get(m.route.param("channel"))
        vnode.state.route = m.route.get()
        model.createEventSource(m.route.param("channel"))

    },
    onupdate: function (vnode) {
        if (vnode.state.route == m.route.get()) {
            return
        }
        model.get(m.route.param("channel"))
        vnode.state.route = m.route.get()
        model.createEventSource(m.route.param("channel"))

    },
    onremove: function (vnode) {
        model.leaveEventSource(m.route.param("channel"))
    },
    getTitle: function () {
        return `Сонгреквесты на канале ${channelName.get(m.route.param("channel"))}`
    },
    route: routes.SONGREQUESTS,
    view(vnode) {
        return model.songrequestInfo != null ? m(".songrequests", [
            m("h1", `Сонгреквесты на канале ${channelName.get(model.channelID)}`),
            m(".songrequests__container", [
                m(".songrequests__player", {
                        oncreate(vnode) {
                            var tag = document.createElement('script')
                            tag.src ="https://www.youtube.com/player_api";
                            var firstScriptTag = document.getElementsByTagName('script')[0]
                            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
                            if (model.player != null) {
                                model.player = new YT.Player(vnode.dom, {
                                    playerVars: { 'autoplay': 1, html5: 1 },
                                 
                                    events: {
                                        'onReady': onPlayerReady,
                                        'onStateChange': onPlayerStateChange
                                    }
                                })
                                return
                            }
                            window.onYouTubePlayerAPIReady = function () {
                                model.player = new YT.Player(vnode.dom, {
                                    playerVars: { 'autoplay': 1, html5: 1  },
                                    events: {
                                        'onReady': onPlayerReady,
                                        'onStateChange': onPlayerStateChange
                                    }
                                })



                            }

                            function onPlayerReady() {
                                model.playerReady = true
                                model.afterInit()
                            }

                            function onPlayerStateChange() {
                                console.log(model.player.getPlayerState())
                                if (model.player.getPlayerState() == 0) {
                                    console.log("Video ended")
                                    model.skipVideo(model.player.getVideoData().video_id)
                                }

                            }
                        },

                    }

                ),
                m(".songrequests__requests", model.songrequestInfo.requests.sort(function (a, b) {
                    var c = a.order
                    var d = b.order
                    return c - d
                }).map(f => m(songrequestsItem, {
                    key: f.videoID,
                    item: f,
                    isMod: model.songrequestInfo.isMod,
                    isOwner: model.songrequestInfo.isOwner
                })))
            ])
        ]) : null
    }
}