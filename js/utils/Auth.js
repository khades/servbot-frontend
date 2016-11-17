var m = require("mithril")

var Auth = {
    request: function (config) {
        return m.request(config).map(function (data) {
            return data
        }).catch(function (error) {
            if (error.status == 401) {
                localStorage.setItem("redirect", m.route.get());
                window.location = "/oauth/initiateAuth"
            }
            throw error
        })
    }
}

module.exports = Auth