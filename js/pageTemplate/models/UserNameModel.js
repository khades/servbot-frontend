import Auth from '../../utils/auth';
import ConfigURL from '../../utils/appUrl';
var UserNameModel = {
    userName: null,
    userNamePromise: null,
    userID: null,
    getUsername: function () {
        if (this.userNamePromise == null)
            this.userNamePromise = Auth.request({
                method: "GET",
                url: ConfigURL("/api/user")
            }).then(function (response) {
                UserNameModel.userName = response.username
                UserNameModel.profileImage = response.avatarUrl
                UserNameModel.userID = response.userID
            }.bind(this))
    },
    profileImage: null
}


export default UserNameModel;