import m from 'mithril'
import model from './models/model'
import '../../scss/modules/_songrequests.scss'
import states from '../utils/states'
import songrequestsItem from './components/songrequestsItem'
import channelName from '../utils/channelName'
import routes from '../pageTemplate/routes'
import settings from './components/settings'
import formatDuration from '../utils/formatDuration'
import loading from '../basic/loading'
import l10n from '../l10n/l10n'
import notifications from '../notifications/notifications'
import bannedtracks from './components/bannedtracks'

export default {
    oninit: function (vnode) {
        model.state = states.LOADING
        model.songrequestInfo = null
        model.videoID = null
        model.playerReady = false
        vnode.state.route = m.route.get()
        model.volume = 100
        model.createEventSource(m.route.param("channel"))
        vnode.state.shownPane = "playlist"

    },
    onupdate: function (vnode) {
        if (vnode.state.route == m.route.get()) {
            return
        }

        vnode.state.route = m.route.get()
        model.createEventSource(m.route.param("channel"))

    },
    onremove: function (vnode) {
        model.leaveEventSource(m.route.param("channel"))
    },
    getTitle: function () {
        if (model.state == states.READY) {
            return l10n.get("SONGREQUESTS_TITLE", channelName.get(m.route.param("channel")))
        }
        return ""
    },
    route: routes.SONGREQUESTS,
    view(vnode) {
        // console.log(JSON.stringify(model.songrequestInfo))
        if (model.state == states.LOADING) {
            return m(loading)
        }
        return m(".songrequests", {
            class: model.songrequestInfo.isOwner == false ? "songrequests--noplayer" : ""
        }, [
            m(".songrequests__hgroup", [
                m(".songrequests__header", l10n.get("SONGREQUESTS_TITLE", channelName.get(m.route.param("channel")))),
                model.songrequestInfo.isOwner == true || model.songrequestInfo.isMod == true ? m(".songrequests__buttons", [
                    vnode.state.shownPane != "bannedtracks" ? m('button', {
                        type: "button",
                        onclick() {
                            vnode.state.shownPane = "bannedtracks"
                        }
                    }, l10n.get("SONGREQUESTS_SHOW_BANNED_TRACKS")) : null,
                    vnode.state.shownPane != "settings" ? m('button', {
                        type: "button",
                        onclick() {
                            vnode.state.shownPane = "settings"
                        }
                    }, l10n.get("SONGREQUESTS_SHOW_SETTINGS")) : null,
                    vnode.state.shownPane != "playlist" ? m('button', {
                        type: "button",
                        onclick() {
                            vnode.state.shownPane = "playlist"
                        }
                    }, l10n.get("SONGREQUESTS_RETURN_TO_PLAYLIST")) : null
                ]) : null
            ]),
            m(".songrequests__container", [
                model.songrequestInfo.isOwner == true ? m(".songrequests__player-container", {
                    class: vnode.state.shownPane != "playlist" ? "songrequests__player-container--hidden" : ""
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
                                            'controls': 0,
                                            'disablekb': 0,
                                            'rel': 0,
                                            'vq': "large"
                                        },

                                        events: {
                                            'onReady': onPlayerReady,
                                            'onStateChange': onPlayerStateChange,
                                            'onError': onError
                                    
                                        }
                                    })
                                    return
                                }
                                window.onYouTubePlayerAPIReady = function () {
                                    model.player = new YT.Player(vnode.dom, {
                                        playerVars: {
                                            'controls': 0,
                                            'disablekb': 0,
                                            'rel': 0,
                                            'vq': "large"
                                        },
                                        events: {
                                            'onReady': onPlayerReady,
                                            'onStateChange': onPlayerStateChange,
                                            'onError': onError//,
                                            // 'onError': function (event) {
                                            //     if (event.data == 100 || event.data == 101 || event.data == 150) {
                                            //         model.setAsYoutubeRestrictred(model.player.getVideoData().video_id)
                                            //         // notifications.addNotification(l10n.get("SONGREQUEST_CANT_PLAY_DUE_YOUTUBE", model.currentVideo.title))
                                            //     }
                                            // }
                                        }
                                    })



                                }
                                function onError(event) {
                               
                                        if (event.data == 100 || event.data == 101 || event.data == 150) {
                                            model.setAsYoutubeRestrictred(model.player.getVideoData().video_id)
                                            // notifications.addNotification(l10n.get("SONGREQUEST_CANT_PLAY_DUE_YOUTUBE", model.currentVideo.title))
                                        }
                               
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

                ]) : null,
                vnode.state.shownPane == "settings" ? m(settings) : null,
                vnode.state.shownPane == "bannedtracks" ? m(bannedtracks) : null,

                vnode.state.shownPane == "playlist" && model.songrequestInfo != null && model.songrequestInfo.requests != null ? m(".songrequests__requests", model.songrequestInfo.requests.sort(function (a, b) {
                    var c = a.order
                    var d = b.order
                    return c - d
                }).map(f => m(songrequestsItem, {
                    item: f,
                    isMod: model.songrequestInfo.isMod,
                    isOwner: model.songrequestInfo.isOwner
                }))) : null,
                model.songrequestInfo != null && model.songrequestInfo.isOwner == true ? m(".songrequests__controls", [
                    m("input.songrequests__seeker", {
                        oncreate(lvnode) {
                            lvnode.state.timer = setInterval(() => {
                                if (!!model.player && !!model.player.getCurrentTime && model.seekerIsPicked != true) {

                                    lvnode.dom.value = model.player.getCurrentTime() * 100

                                }
                            }, 200)
                        },
                        oninput(event) {
                            model.seekerIsPicked = true
                            event.redraw = false
                        },
                        onbeforeremove(lvnode) {
                            clearInterval(lvnode.state.timer)
                        },
                        type: "range",
                        min: 0,

                        max: !!model.player && model.player.getDuration ? model.player.getDuration() * 100 : 0,
                        value: !!model.player && !!model.player.getCurrentTime ? model.player.getCurrentTime() * 100 : 0,
                        onchange(event) {
                            model.seekerIsPicked = false
                            event.redraw = false
                            model.player.seekTo(event.target.value / 100)
                        }
                    }),
                    model.songrequestInfo.requests != null && model.songrequestInfo.requests.length > 0 ? m(".songrequests__song-info", [!!model.player && !!model.player.getPlayerState && model.player.getPlayerState() == 1 ? m(".songrequests__pause-button", {
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
                                m("div.songrequests__request-title", model.currentVideo.title),

                                m("div", {
                                    oncreate(lvnode) {
                                        lvnode.state.timer = setInterval(() => {
                                            if (!!model.player && !!model.player.getCurrentTime) {
                                                lvnode.dom.innerHTML = `${formatDuration(model.player.getCurrentTime())}/${formatDuration(model.player.getDuration())}`

                                            }
                                        }, 200)
                                    },
                                    onbeforeremove(lvnode) {
                                        clearInterval(lvnode.state.timer)
                                    }



                                })
                            ]),
                            m(".songrequests__request-user", "@" + model.currentVideo.user),

                        ]) : m(".songrequests__song-info")) : null,
                    model.currentVideo != null ? m(".songrequests__volume-control", [
                        m(".songrequests__volume-control-icon"),
                        m("input", {
                            type: "range",
                            min: 0,
                            max: 100,
                            value: model.getVolume(),
                            onchange(event) {
                                event.redraw = false
                                model.pushVolumeToDb(event.target.value)
                                model.setVolume(event.target.value)
                            }
                        })
                    ]) : null

                ]) : null
            ])
        ])
    }
};