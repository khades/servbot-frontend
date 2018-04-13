var m = require("mithril")
var model = require("./models/show")
var historyItem = require("./components/historyItem")
require("../../scss/modules/_template-show.scss")
var input = require("../basicWidgets/components/InputComponent")
var textarea = require("../basicWidgets/textarea")
var multiinput = require("../basicWidgets/multiinput")
var check = require("../basicWidgets/components/CheckBoxComponent")
var states = require("../utils/states.js")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")
var l10n = require("../l10n/l10n")
module.exports = {
    oninit: function (vnode) {
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"), m.route.param("template"))

    },
    onupdate: function (vnode) {
        if (vnode.state.route == m.route.get())
            return
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"), m.route.param("template"))

    },
    route: routes.TEMPLATES,
    getTitle() {
        return l10n.get("TEMPLATE_TITLE", m.route.param("template"), channelName.get(m.route.param("channel")))
    },
    view(vnode) {
        return model.state == states.READY ? m(".template-show", [


            m(".template-show__block", [
                m("hgroup.template-show__hgroup", [


                    m(".template-show__header-nm", l10n.get("TEMPLATE_TITLE", m.route.param("template"), channelName.get(m.route.param("channel")))),
                    model.extended == true ? m("button", {
                        type: "button",
                        onclick: () => {
                            model.extended = false
                        }
                    }, l10n.get("TEMPLATE_HIDE_EXTENDED_SETTINGS")) : m("button", {
                        type: "button",
                        onclick: () => {
                            model.extended = true
                        }
                    }, l10n.get("TEMPLATE_SHOW_EXTENDED_SETTINGS")),
                ]), !!model.template.aliasTo && model.template.aliasTo != "" && model.template.commandName != model.template.aliasTo ? l10n.get("ALIAS_TO", model.template.aliasTo) : null,
                m(textarea, {
                    label: l10n.get("TEMPLATE_MESSAGE"),
                    id: "newCommand",
                    error: model.errorTemplate ? l10n.get("INVALID_TEMPLATE") : null,
                    getValue: () => {
                        return model.template.template
                    },
                    setValue: (value) => {
                        model.template.template = value.trim()
                    }
                }),
                m(".template-show__buttons", [
                    m("button", {
                        type: "button",
                        onclick: () => {
                            model.save()
                        }
                    }, l10n.get("SAVE")),
                    m("button", {
                        type: "button",
                        onclick: () => {
                            model.template.template = ""
                            model.save()
                        }
                    }, l10n.get("TEMPLATE_DELETE"))
                ])
            ]),
            m(".template-show__block", [
                m(input, {
                    label: l10n.get("TEMPLATE_ALIAS_TO"),
                    id: "newCommand",
                    getValue: () => {
                        return model.template.aliasTo
                    },
                    setValue: (value) => {
                        model.template.aliasTo = value.trim()
                    }
                }),
                m(".template-show__buttons", [
                    m("button", {
                        type: "button",
                        onclick: () => {
                            model.setAliasTo()
                        }
                    }, l10n.get("SAVE")), !!model.template.aliasTo && model.template.aliasTo != "" && model.template.commandName != model.template.aliasTo ? m("a", {
                        oncreate: m.route.link,
                        href: `/channel/${model.template.channelID}/templates/${model.template.aliasTo}`
                    }, m("button", l10n.get("TEMPLATE_GO_TO_ORIGINAL"))) : "",
                ]),
            ]),

            // model.extended == true ? [
            //     m(".template-show__block", [
            //         m(".template-show__header", l10n.get("EXTENDED_SETTINGS")),
                  
            //         m(check, {
            //             id: "PreventDebounce",
            //             getValue: () => model.template.preventDebounce,
            //             setValue: value => {

            //                 model.template.preventDebounce = value
            //             },
            //             label: l10n.get("TEMPLATE_IGNORE_DEBOUNCER")
            //         }),
            //         m(check, {
            //             id: "PreventRedirect",
            //             getValue: () => model.template.preventRedirect,
            //             setValue: value => {

            //                 model.template.preventRedirect = value
            //             },
            //             label: l10n.get("TEMPLATE_PREVENT_REDIRECT")
            //         })
            //     ]),
            //     m(".template-show__block", [
            //         m(".template-show__header", l10n.get("TEMPLATE_STRING_RANDOMIZER")),
            //         m(check, {
            //             id: "EnableStringRandomizer",
            //             getValue: () => model.template.stringRandomizer.enabled,
            //             setValue: value => {

            //                 model.template.stringRandomizer.enabled = value
            //                 m.redraw()
            //             },
            //             label: l10n.get("TEMPLATE_ENABLE_STRING_RANDOMIZER")
            //         }), !!model.template.stringRandomizer && model.template.stringRandomizer.enabled == true ? [
            //             m(multiinput, {
            //                 getValues: () => model.template.stringRandomizer.strings,
            //                 setValues: (values) => model.template.stringRandomizer.strings = values,
            //                 id: "randomizerStrings"
            //             }),
            //             m(textarea, {
            //                 label: l10n.get("TEMPLATE_IMPORT_FROM_STRING"),
            //                 id: "stringRandomizerTemplates",
            //                 getValue: () => {
            //                     return !!model.stringRandomizerTemplate ? model.stringRandomizerTemplate : ""
            //                 },
            //                 setValue: (value) => {
            //                     model.stringRandomizerTemplate = value.trim()
            //                 }
            //             }),
            //             m(".template-show__buttons", [
            //                 m("button", {
            //                     type: "button",
            //                     onclick: () => {
            //                         model.template.stringRandomizer.strings = model.stringRandomizerTemplate.split(",").map(f => f.replace(/\"/g, "").trim())
            //                     }
            //                 }, l10n.get("TEMPLATE_PARSE_STRING"))
            //             ]),
            //         ] : "",
            //     ]),
            //     m(".template-show__block", [
            //         m(".template-show__header", l10n.get("TEMPLATE_INTEGER_RANDOMIZER")),

            //         m(check, {
            //             id: "EnableIntegerRandomizer",
            //             getValue: () => model.template.integerRandomizer.enabled,
            //             setValue: value => {

            //                 model.template.integerRandomizer.enabled = value
            //                 m.redraw()
            //             },
            //             label: l10n.get("TEMPLATE_ENABLE_INTEGER_RANDOMIZER")
            //         }), !!model.template.integerRandomizer && model.template.integerRandomizer.enabled == true ? [m(input, {
            //                 label: l10n.get("TEMPLATE_INTEGER_RANDOMIZER_LOWER_LIMIT"),
            //                 id: "integerLowerRange",

            //                 getValue: () => {
            //                     return model.template.integerRandomizer.lowerLimit
            //                 },
            //                 setValue: (value) => {
            //                     model.template.integerRandomizer.lowerLimit = parseInt(value)
            //                 }
            //             }),
            //             m(input, {
            //                 label: l10n.get("TEMPLATE_INTEGER_RANDOMIZER_UPPER_LIMIT"),
            //                 id: "integerUpperRange",
            //                 getValue: () => {
            //                     return model.template.integerRandomizer.upperLimit
            //                 },
            //                 setValue: (value) => {
            //                     model.template.integerRandomizer.upperLimit = parseInt(value)
            //                 }
            //             }),
            //             m(check, {
            //                 id: "EnableIntegerTimeoutAfter",
            //                 getValue: () => model.template.integerRandomizer.timeoutAfter,
            //                 setValue: value => {
            //                     model.template.integerRandomizer.timeoutAfter = value
            //                 },
            //                 label: l10n.get("TEMPLATE_INTEGER_RANDOMIZER_TIMEOUT"),
            //             })
            //         ] : null
            //     ])
            // ] : null, 
            !!model.template.history ? m(".template-show__block", [
                m(".template-show__header", l10n.get("TEMPLATE_EDIT_HISTORY")),
                m(".template-show__history", model.template.history.map(f => m(historyItem, f)))
            ]) : null
        ]) : null
    }
}