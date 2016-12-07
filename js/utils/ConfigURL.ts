import config from "../../config"

function ConfigURL(uri) {
    if (uri.startsWith("/")) {
        return config.appUrl + uri
    } else {
        return config.appUrl + "/" + uri
    }
}
export default ConfigURL