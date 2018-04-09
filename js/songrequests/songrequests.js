var m = require("mithril")
var model = require("./models/model")
require("../../scss/modules/_songrequests.scss")
var states = require("../utils/states")
var songrequestsItem = require("./components/songrequestsItem")
var channelName = require("../utils/channelName")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")
var settings = require("./components/settings")
var formatDuration = require("../utils/formatDuration")
module.exports = {
    oninit: function (vnode) {
        model.songrequestInfo = null
        model.videoID = null
        model.playerReady = false
        // model.get(m.route.param("channel"))
        vnode.state.route = m.route.get()
        model.createEventSource(m.route.param("channel"))

    },
    onupdate: function (vnode) {
        if (vnode.state.route == m.route.get()) {
            return
        }

        //     model.get(m.route.param("channel"))
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
            m(".songrequests__hgroup", [
                m(".songrequests__header", `Сонгреквесты на канале ${channelName.get(model.channelID)}`),
                m('button', {
                    type: "button",
                    onclick() {
                        if (vnode.state.settingsShown == true) {
                            vnode.state.settingsShown = false
                        } else {
                            vnode.state.settingsShown = true

                        }
                    }
                }, vnode.state.settingsShown == true ? "Спрятать настройки" : "Показать настройки")
            ]),
            m(".songrequests__container", [
                m(".songrequests__player-container", {
                    class: vnode.state.settingsShown == true ? "songrequests__player-container--hidden" : ""

                }, [
                    m(".songrequests__player", {
                            oncreate(vnode) {
                                var tag = document.createElement('script')
                                tag.src = "https://www.youtube.com/player_api";
                                var firstScriptTag = document.getElementsByTagName('script')[0]
                                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
                                if (model.player != null) {
                                    model.player = new YT.Player(vnode.dom, {
                                        playerVars: {
                                            'autoplay': 1,
                                            html5: 1
                                        },

                                        events: {
                                            'onReady': onPlayerReady,
                                            'onStateChange': onPlayerStateChange
                                        }
                                    })
                                    return
                                }
                                window.onYouTubePlayerAPIReady = function () {
                                    model.player = new YT.Player(vnode.dom, {
                                        playerVars: {
                                            'autoplay': 0,
                                            'controls': 0
                                        },
                                        events: {
                                            'onReady': onPlayerReady,
                                            'onStateChange': onPlayerStateChange,
                                            'onError': function (data) {
                                                console.log("PLAYER ERROR")
                                                console.log(data)
                                            }
                                        }
                                    })



                                }

                                function onPlayerReady() {
                                    model.playerReady = true
                                    model.afterInit(false, true)
                                }

                                function onPlayerStateChange() {
                                    m.redraw()
                                    if (model.player.getPlayerState() == 0) {
                                        model.skipVideo(model.player.getVideoData().video_id)
                                    }

                                }
                            },

                        }

                    ),

                ]),
                vnode.state.settingsShown == true ? m(settings) : m(".songrequests__requests", model.songrequestInfo.requests.sort(function (a, b) {
                    var c = a.order
                    var d = b.order
                    return c - d
                }).map(f => m(songrequestsItem, {
                    item: f,
                    isMod: model.songrequestInfo.isMod,
                    isOwner: model.songrequestInfo.isOwner
                }))),
                m(".songrequests__controls", [
                    m("input.songrequests__seeker", {
                        oncreate(lvnode){
                            lvnode.state.timer =setInterval(() => {
                                if (!!model.player && !!model.player.getCurrentTime) {
         
                                    lvnode.dom.value = model.player.getCurrentTime()*100 

                                }
                            }, 200)
                        },
                        onbeforeremove(lvnode) {
                            clearInterval(lvnode.state.timer)
                        },
                        type: "range",
                        min: 0,
                   
                        max: !!model.player ? model.player.getDuration()*100 : 0,
                        value: !!model.player ? model.player.getCurrentTime()*100 : 0,
                        onchange(event) {
                            event.redraw = false
                            model.player.seekTo(event.target.value/100)
                        }
                    }),
                    model.songrequestInfo.requests.length > 0 ? m(".songrequests__song-info", [!!model.player && model.player.getPlayerState() == 1 ? m(".songrequests__pause-button", {
                                onclick() {
                                    model.player.pauseVideo()
                                }
                            }) : m(".songrequests__play-button", {
                                onclick() {
                                    model.player.playVideo()
                                }
                            }),
                            m(".songrequests__skip-button", {
                                onclick() {
                                    model.skipVideo(model.videoID)
                                }
                            })
                        ],
                        model.currentVideo != null ? m(".songrequests__request-label", [
                            m(".songrequests__request-upper-part", [
                                m("div.songrequests__request-title",model.currentVideo.title),
                            
                                m("div", {
                                    oncreate(lvnode){
                                        lvnode.state.timer =setInterval(() => {
                                            if (!!model.player && !!model.player.getCurrentTime) {
                                                lvnode.dom.innerHTML = `${formatDuration(model.player.getCurrentTime())}/${formatDuration(model.player.getDuration())}`
            
                                            }
                                        }, 200)
                                    },
                                    onbeforeremove(lvnode) {
                                        clearInterval(lvnode.state.timer)
                                    }
                             
                       
                                 
                                })]),
                            m(".songrequests__request-user", "@" + model.currentVideo.user),

                        ]) : null) : null,
                    m(".songrequests__volume-control", [
                        m(".songrequests__volume-control-icon"),
                        m("input", {
                            type: "range",
                            min: 0,
                            max: 100,
                            value: !!model.player ? model.player.getVolume() : 100,
                            onchange(event) {
                                event.redraw = false
                                model.player.setVolume(event.target.value)
                            }
                        })
                    ])

                ])
            ])
        ]) : null
    }
}