var m = require("mithril")
var Auth = {
    request: function (config) {
        return m.request(config).then(function (data) {
            return data
        }).catch(function (error) {
            console.log(error)
            if (error.Code == 401) {
                localStorage.setItem("redirect", m.route.get())
                window.location.href = "/oauth/initiate"
            }
            throw error
        })
    }
}

module.exports = Auth 