import * as m from 'mithril'
var Auth = {
    request: function (config) {
        return m.request(config).then(function (data) {
            return data
        }).catch(function (error) {
            console.log(error)
            if (error.status == 401) {
                localStorage.setItem("redirect", m.route.get())
                window.location.href = "/oauth/initiateAuth"
            }
            throw error
        })
    }
}

export default Auth 