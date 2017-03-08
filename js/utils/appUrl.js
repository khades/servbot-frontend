var config = require("../../config")

module.exports = function(uri) {
    if (uri.startsWith("/")) {
        return config.appUrl + uri
    } else {
        return config.appUrl + "/" + uri
    }
}
