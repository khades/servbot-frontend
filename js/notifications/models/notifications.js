var notifications = {
    notifications: [],
    addNotification(text, key) {
        if (!!key) {
           var found =  this.notifications.some(f => f.key == key)
           if (found) return
        }
        this.notifications.push({
            date: new Date,
            body: text, 
            key: key
        })
    }
}

module.exports = notifications