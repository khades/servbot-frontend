var Auth = require("../../utils/Auth")
var UserNameModel = {
    userName: null,
    userNamePromise: null,
    getUsername: function () {
        if (this.userNamePromise == null)
            this.userNamePromise = Auth.request({
                method: "GET",
                url: "/api/user"
            }).map(function (response) {
                UserNameModel.userName = response.username
                this.userNamePromise = Auth.request({
                    method: "GET",
                    url: `https://api.twitch.tv/kraken/channels/${response.username}`
                }).map(function (logoResponse) {
                    if (!!logoResponse.logo)
                        UserNameModel.profileImage = logoResponse.logo
                })
            })
    },
    profileImage: null
}


module.exports = UserNameModel