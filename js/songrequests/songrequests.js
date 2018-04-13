import m from 'mithril';
import model from './models/model';
import '../../scss/modules/_songrequests.scss';
import states from '../utils/states';
import songrequestsItem from './components/songrequestsItem';
import channelName from '../utils/channelName';
import routes from '../pageTemplate/routes';
import settings from './components/settings';
import formatDuration from '../utils/formatDuration';
import loading from '../basic/loading';

export default {
    oninit: function (vnode) {
        model.state = states.LOADING
        model.songrequestInfo = null
        model.videoID = null
        model.playerReady = false
        vnode.state.route = m.route.get()
        model.volume = 100
        model.createEventSource(m.route.param("channel"))

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
        return `Сонгреквесты на канале ${channelName.get(m.route.param("channel"))}`
    },
    route: routes.SONGREQUESTS,
    view(vnode) {
        if (model.state == states.LOADING) {
            return m(loading)
        }
        return m(".songrequests", {
            class: model.songrequestInfo.isOwner == false ? "songrequests--noplayer" : ""
        }, [
            m(".songrequests__hgroup", [
                m(".songrequests__header", `Сонгреквесты на канале ${channelName.get(model.channelID)}`),
                model.songrequestInfo.isOwner == true || model.songrequestInfo.isMod == true ? m('button', {
                    type: "button",
                    onclick() {
                        if (vnode.state.settingsShown == true) {
                            vnode.state.settingsShown = false
                        } else {
                            vnode.state.settingsShown = true

                        }
                    }
                }, vnode.state.settingsShown == true ? "Спрятать настройки" : "Показать настройки"): null
            ]),
            m(".songrequests__container", [
                model.songrequestInfo.isOwner == true ? m(".songrequests__player-container", {
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
                                            'autoplay': 0,
                                            'controls': 0,
                                            'disablekb': 0,
                                            'rel': 0,
                                            'vq': "large"
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
                                            'controls': 0,
                                            'disablekb': 0,
                                            'rel': 0,
                                            'vq': "large"
                                        },
                                        events: {
                                            'onReady': onPlayerReady,
                                            'onStateChange': onPlayerStateChange,
                                            'onError': function (event) {
                                                if (event.data == 100 || event.data == 101 || event.data == 150) {
                                                    model.setAsYoutubeRestrictred(model.player.getVideoData().video_id)

                                                }
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

                ]) : null,
                vnode.state.settingsShown == true ? m(settings) : null,
                vnode.state.settingsShown != true && model.songrequestInfo != null ? m(".songrequests__requests", model.songrequestInfo.requests.sort(function (a, b) {
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
                                if (!!model.player && !!model.player.getCurrentTime) {

                                    lvnode.dom.value = model.player.getCurrentTime() * 100

                                }
                            }, 200)
                        },
                        onbeforeremove(lvnode) {
                            clearInterval(lvnode.state.timer)
                        },
                        type: "range",
                        min: 0,

                        max: !!model.player && model.player.getDuration ? model.player.getDuration() * 100 : 0,
                        value: !!model.player && !!model.player.getCurrentTime ? model.player.getCurrentTime() * 100 : 0,
                        onchange(event) {
                            event.redraw = false
                            model.player.seekTo(event.target.value / 100)
                        }
                    }),
                    model.songrequestInfo.requests.length > 0 ? m(".songrequests__song-info", [!!model.player && !!model.player.getPlayerState && model.player.getPlayerState() == 1 ? m(".songrequests__pause-button", {
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
                    m(".songrequests__volume-control", [
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
                    ])

                ]) : null
            ])
        ])
    }
};