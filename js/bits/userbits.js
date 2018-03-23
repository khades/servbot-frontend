var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var model = require("./models/userbits")
var component = require("./components/userbits")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")


module.exports = {
    render() {
        return m(PageTemplateComponent, {
            route: routes.BITS,
            title: `История битсов пользователя ${model.result.user} на канале ${channelName.get(m.route.param("channel"))}`,
            content: m(component),

        })

    }
}