var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var model = require("./models/bits")
var component = require("./components/bits")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")

module.exports = {
    render() {
        return m(PageTemplateComponent, {
            route: routes.BITS,
            title: "Список людей, поддержавших канал",
            content: m(component, {
                result: model.result,
                channelID: m.route.param("channel")
            }),

        })

    }
}