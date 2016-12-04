function ConfigURL(uri) {
    if (uri.startsWith("/")) {
        return "http://localhost:8000" + uri
    } else {
        return "http://localhost:8000/" + uri
    }
}
export { ConfigURL }