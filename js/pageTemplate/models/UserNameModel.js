var Auth = require("../../utils/auth")
var ConfigURL = require("../../utils/appUrl")
var UserNameModel = {
    userName: null,
    userNamePromise: null,
    getUsername: function () {
        if (this.userNamePromise == null)
            this.userNamePromise = Auth.request({
                method: "GET",
                url: ConfigURL("/api/user")
            }).then(function (response) {
                UserNameModel.userName = response.username
                UserNameModel.profileImage = response.avatarUrl
            }.bind(this))
    },
    profileImage: null
}


module.exports = UserNameModel