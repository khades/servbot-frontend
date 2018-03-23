var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var component = require("./components/сomponent")
var model = require("./models/model")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")

module.exports = {

    render() {
        return m(PageTemplateComponent, {
            route: routes.SONGREQUESTS,
            title: `Сонгреквесты на канале ${channelName.get(m.route.param("channel"))}`,
            content: m(component),

        })

    }
}