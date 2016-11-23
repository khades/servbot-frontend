var m = require("mithril")
var LogUsersPageModel = require("../models/LogUsersPageComponent")
var LogUsersComponent = {
    view: function (vnode) {
        return m(".channel_users",
            m("a", LogUsersPageModel.results.map(user => {
                return m("a", {
                    oncreate: m.route.link,
                    href: "/channel/"+ LogUsersPageModel.channel + "/logs/" + user.User + "/1"
                }, user.User +  user.Count)
            }))
        )

    }
}
module.exports = LogUsersComponent