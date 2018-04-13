import config from '../../config';

export default function(uri) {
    if (uri.startsWith("/")) {
        return config.appUrl + uri
    } else {
        return config.appUrl + "/" + uri
    }
};
