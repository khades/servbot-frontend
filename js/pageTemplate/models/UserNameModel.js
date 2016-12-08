import  Auth  from "../../utils/Auth"
import ConfigURL  from "../../utils/ConfigURL"
var UserNameModel = {
    userName: null,
    userNamePromise: null,
    getUsername: function () {
        if (this.userNamePromise == null)
            this.userNamePromise = Auth.request({
                method: "GET",
                url: ConfigURL("/api/user")
            }).then(function (response) {
                UserNameModel.userName = response.Username
                // this.userNamePromise = Auth.request({
                //     method: "GET",
                //     url: `https://api.twitch.tv/kraken/channels/${response.Username}`
                // }).then(function (logoResponse) {
                //     if (!!logoResponse.logo)
                //         UserNameModel.profileImage = logoResponse.logo
                // })
            }.bind(this))
    },
    profileImage: null
}


export default UserNameModel