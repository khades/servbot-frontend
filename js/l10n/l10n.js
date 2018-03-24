var printf = require('sprintf-js').sprintf

var l10nEN = {
    SAVE: "Save",
    TIME_SECONDS:"%s seconds",
    VAL_NOT_EMPTY: "Should me not empty",
    VAL_INT_MIN: "Minimal value - %s",
    WELCOME_TITLE: "Welcome to etozhebot",
    AUTOMESSAGES_TITLE: "Automessages on channel %s",
    AUTOMESSAGES_CREATE_NEW: "Create new automessage",
    AUTOMESSAGES_DELETE_INACTIVE: "Delete inactive automessages",
    AUTOMESSAGES_CREATION: "Creating new automessage",
    AUTOMESSAGES_EDITING: "Editing automessage %s",
    AUTOMESSAGES_SETTINGS: "Automessage settings",
    AUTOMESSAGES_INFORMATION: "Automessage information",
    AUTOMESSAGES_NEXT_MESSAGETHRESHOLD: "Messages until next message will be sent: %s",
    AUTOMESSAGES_NEXT_DURATIONTHRESHOLD: "Next message will be sent after: %s",
    AUTOMESSAGES_EDIT_HISTORY: "Automessage history",
    AUTOMESSAGES_BODY: "Automessage body",
    AUTOMESSAGES_MESSAGE_THRESHOLD: "Chat messages count, before sending this automessage",
    AUTOMESSAGES_DURATION_THRESHOLD: "Period (in seconds) between automessages",
    AUTOMESSAGES_SEND_DURING_GAME: "Game on stream, this message will be sent on",
    BANS_TITLE: "Bans on channel %s",
    BANS_PERMANENT: "Permanent"
}

var l10nRU = {
    SAVE: "Сохранить",
    TIME_SECONDS:"%s секунд",
    VAL_NOT_EMPTY: "Не должно быть пустым",
    VAL_INT_MIN: "Минимальное значение - %s",
    WELCOME_TITLE: "Добро пожаловать в etozhebot",
    AUTOMESSAGES_TITLE: "Автосообщения на канале %s",
    AUTOMESSAGES_CREATE_NEW: "Создать новое автосообщение",
    AUTOMESSAGES_DELETE_INACTIVE: "Удалить неактивные автосообщения",
    AUTOMESSAGES_CREATION: "Создание автосообщения",
    AUTOMESSAGES_EDITING: "Редактирование автосообщения %s",
    AUTOMESSAGES_SETTINGS: "Настройки автосообщения",
    AUTOMESSAGES_INFORMATION: "Информация о автосообщении",
    AUTOMESSAGES_NEXT_MESSAGETHRESHOLD: "Сообщений до следующей посылки сообщения: %s",
    AUTOMESSAGES_NEXT_DURATIONTHRESHOLD: "Время следующего срабатывания: %s",
    AUTOMESSAGES_EDIT_HISTORY: "История автосообщения",
    AUTOMESSAGES_BODY: "Тело сообщения",
    AUTOMESSAGES_DURATION_THRESHOLD: "Период (в секундах) между автосообщениями",
    AUTOMESSAGES_MESSAGE_THRESHOLD: "Количество сообщений, после которого автосообщение будет отправлено",
    AUTOMESSAGES_SEND_DURING_GAME: "Игра на стриме, во время которой это сообщение будет отправляться",
    BANS_TITLE: "Баны на канале %s",
    BANS_PERMANENT: "Перманентно"
}

var l10n = {
    "en": l10nEN,
    "ru": l10nRU
}

var currentl10n
var lang = localStorage.getItem("lang")
if (lang == null)
    lang = "en"
if (!!l10n[lang])
    currentl10n = l10n[lang]
else
    currentl10n = l10nEN


function setLang(newlang) {
    if (!!l10n[newllang])
        currentl10n = l10n[newlang]
    lang = newlang
    localStorage.setItem("lang", newlang.toLowerCase())
}

function get() {
    var string = currentl10n[arguments[0]]
    if (!string) {
        return arguments[0]
    }
    if (arguments.length > 1)
        return printf(string, Array.prototype.slice.call(arguments, 1))
    return string
}

module.exports = {
    get: get,
    setLang: setLang,
    getLang() {
        return lang
    }
}