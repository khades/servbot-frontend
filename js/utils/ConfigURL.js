var config = require("../../config")

function ConfigURL(uri) {
    if (uri.startsWith("/")) {
        return config.appUrl + uri
    } else {
        return config.appUrl + "/" + uri
    }
}
module.exports = ConfigURL