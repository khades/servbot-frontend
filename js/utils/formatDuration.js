module.exports = function (input) {
    var floatSeconds = input
    var hours = Math.floor(floatSeconds / 3600)
    var minutes = Math.floor(floatSeconds / 60 - hours * 60)
    var seconds = Math.floor(floatSeconds - minutes * 60)
    var result = seconds
    if (seconds < 10) {
        result = "0" + seconds
    }
    if (minutes < 10) {
        result = "0" + minutes + ":" + result
    } else {
        result = minutes + ":" + result
    }
    if (hours > 0) {
        result = hours + ":" + result
    }
    return result
}