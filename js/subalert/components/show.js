var m = require("mithril")
var model = require("../models/show")
var historyItem = require("./historyItem")
require("../../../scss/modules/_subalert-show.scss")
var input = require("../../basicWidgets/components/InputComponent")
var checkbox = require("../../basicWidgets/components/CheckBoxComponent")
var channelName = require("../../utils/channelName")

module.exports = {
    view(vnode) {
        return m(".subalert-show", [
            m(".subalert-show__header", `Сообщения при подписке на канале ${channelName.get(model.channelID)}`),
            m(checkbox, {
                id: "subAlertEnabled",
                getValue: () => model.subAlert.enabled,
                setValue: value => {
                    model.subAlert.enabled = value
                },
                label: "Сабалерт включён"
            }),
            model.extended == true ? [
                m(input, {
                    label: "Сообщение при follower",
                    class: "subalert-show__sub-message",

                    id: "followerMessage",
                    getValue: () => {
                        return model.subAlert.followerMessage
                    },
                    setValue: (value) => {
                        model.subAlert.followerMessage = value.trim()
                    }
                }),
                m(input, {
                    label: "Сообщение при подписке за Prime",
                    class: "subalert-show__sub-message",

                    id: "subPrimeMessage",
                    getValue: () => {
                        return model.subAlert.subPrimeMessage
                    },
                    setValue: (value) => {
                        model.subAlert.subPrimeMessage = value.trim()
                    }
                }),
                m(input, {
                    label: "Сообщение при переподписке за Prime",
                    id: "resubPrimeMessage",
                    class: "subalert-show__resub-message",
                    error: model.error.primeError ? "Некорректный шаблон" : null,
                    getValue: () => {
                        return model.subAlert.resubPrimeMessage
                    },
                    setValue: (value) => {
                        model.subAlert.resubPrimeMessage = value.trim()
                    }
                }),
                m(input, {
                    label: "Смайлики при переподписке за Prime",
                    id: "resubPrimeSmile",
                    class: "subalert-show__repeat-body",
                    getValue: () => {
                        return model.subAlert.resubPrimeSmile
                    },
                    setValue: (value) => {
                        model.subAlert.resubPrimeSmile = value.trim()
                    }
                }),
                m(input, {
                    label: "Сообщение при подписке за 5$",
                    class: "subalert-show__sub-message",

                    id: "subFiveMessage",
                    getValue: () => {
                        return model.subAlert.subFiveMessage
                    },
                    setValue: (value) => {
                        model.subAlert.subFiveMessage = value.trim()
                    }
                }),
                m(input, {
                    label: "Сообщение при переподписке за 5$",
                    id: "resubFiveMessage",
                    class: "subalert-show__resub-message",
                    error: model.error.fiveError ? "Некорректный шаблон" : null,
                    getValue: () => {
                        return model.subAlert.resubFiveMessage
                    },
                    setValue: (value) => {
                        model.subAlert.resubFiveMessage = value.trim()
                    }
                }),
                m(input, {
                    label: "Смайлики при переподписке за 5$",
                    id: "resubFiveSmile",
                    class: "subalert-show__repeat-body",
                    getValue: () => {
                        return model.subAlert.resubFiveSmile
                    },
                    setValue: (value) => {
                        model.subAlert.resubFiveSmile = value.trim()
                    }
                }),
                m(input, {
                    label: "Сообщение при подписке за 10$",
                    class: "subalert-show__sub-message",

                    id: "subTenMessage",
                    getValue: () => {
                        return model.subAlert.subTenMessage
                    },
                    setValue: (value) => {
                        model.subAlert.subTenMessage = value.trim()
                    }
                }),
                m(input, {
                    label: "Сообщение при переподписке за 10$",
                    id: "resubTenMessage",
                    class: "subalert-show__resub-message",
                    error: model.error.tenError ? "Некорректный шаблон" : null,
                    getValue: () => {
                        return model.subAlert.resubTenMessage
                    },
                    setValue: (value) => {
                        model.subAlert.resubTenMessage = value.trim()
                    }
                }),
                m(input, {
                    label: "Смайлики при переподписке за 10$",
                    id: "resubTenSmile",
                    class: "subalert-show__repeat-body",
                    getValue: () => {
                        return model.subAlert.resubTenSmile
                    },
                    setValue: (value) => {
                        model.subAlert.resubTenSmile = value.trim()
                    }
                }),
                m(input, {
                    label: "Сообщение при подписке за 25$",
                    class: "subalert-show__sub-message",

                    id: "subTwentyFiveMessage",
                    getValue: () => {
                        return model.subAlert.subTwentyFiveMessage
                    },
                    setValue: (value) => {
                        model.subAlert.subTwentyFiveMessage = value.trim()
                    }
                }),



                m(input, {
                    label: "Сообщение при переподписке за 25$",
                    id: "resubTwentyFiveMessage",
                    class: "subalert-show__resub-message",
                    error: model.error.twentyFiveError ? "Некорректный шаблон" : null,
                    getValue: () => {
                        return model.subAlert.resubTwentyFiveMessage
                    },
                    setValue: (value) => {
                        model.subAlert.resubTwentyFiveMessage = value.trim()
                    }
                }),
                m(input, {
                    label: "Смайлики при переподписке за 25$",
                    id: "resubTwentyFiveSmile",
                    class: "subalert-show__repeat-body",
                    getValue: () => {
                        return model.subAlert.resubTwentyFiveSmile
                    },
                    setValue: (value) => {
                        model.subAlert.resubTwentyFiveSmile = value.trim()
                    }
                })
            ] : [
                m(input, {
                    label: "Сообщение при follow",
                    class: "subalert-show__sub-message",

                    id: "followerMessage",
                    getValue: () => {
                        return model.subAlert.followerMessage
                    },
                    setValue: (value) => {
                        model.subAlert.followerMessage = value.trim()
                    }
                }),
                m(input, {
                    label: "Сообщение при подписке за 5$",
                    class: "subalert-show__sub-message",

                    id: "subFiveMessage",
                    getValue: () => {
                        return model.subAlert.subFiveMessage
                    },
                    setValue: (value) => {
                        model.subAlert.subFiveMessage = value.trim()
                    }
                }),
                m(input, {
                    label: "Сообщение при переподписке за 5$",
                    id: "resubFiveMessage",
                    class: "subalert-show__resub-message",
                    error: model.error.fiveError ? "Некорректный шаблон" : null,
                    getValue: () => {
                        return model.subAlert.resubFiveMessage
                    },
                    setValue: (value) => {
                        model.subAlert.resubFiveMessage = value.trim()
                    }
                }),
                m(input, {
                    label: "Смайлики при переподписке за 5$",
                    id: "resubFiveSmile",
                    class: "subalert-show__repeat-body",
                    getValue: () => {
                        return model.subAlert.resubFiveSmile
                    },
                    setValue: (value) => {
                        model.subAlert.resubFiveSmile = value.trim()
                    }
                })
            ],
            m("button", {
                type: "button",
                onclick: () => {
                    model.save()
                }
            }, "Сохранить"),
            model.extended == false ? m("button", {
                type: "button",
                onclick: () => {
                    model.extended = true
                }
            }, "Показать больше") : "", !!model.subAlert.history ? m(".subalert-show__header", "История команд") : "", !!model.subAlert.history ? m(".subalert-show__history", model.subAlert.history.map(f => {
                f.extended = model.isExtended(f)
                return m(historyItem, f)
            })) : ""
        ])
    }
}