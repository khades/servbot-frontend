import m from 'mithril';
import model from './models/logs';
import '../../scss/modules/_user-logs.scss';
import routes from '../pageTemplate/routes';
import channelName from '../utils/channelName';
import l10n from '../l10n/l10n';
import loading from '../basic/loading';
import states from '../utils/states.js';

var generateClass = function (f) {
  if (f.messageType == "timeout")
    return "user-logs__history__timeout"
  if (f.messageType == "ban")
    return "user-logs__history__ban"
  return "user-logs__history__message-body"
}
var generateMessagebody = function (f) {
  var result = []
  // var result = f.messageBody
  if (f.messageType == "timeout")
    result.push(m(".user-logs__ban-reason", l10n.get("BANS_TIMEOUT", f.banLength)))
  if (f.messageType == "ban")
    result.push(m(".user-logs__ban-reason", l10n.get("BANS_PERMANENT")))


  if (f.messageType == "untimeout")
    result.push(m(".user-logs__ban-reason", l10n.get("BANS_UNTIMEOUT")))
  if (f.messageType == "unban")
    result.push(m(".user-logs__ban-reason", l10n.get("BANS_UNBAN")))
  if (f.banIssuer != "") {
    if (f.banReason != "") {
      result.push(m(".user-logs__ban-description", `@${f.banIssuer} - ${l10n.get("REASON")}: "${f.banReason}"`))
    } else {
      result.push(m(".user-logs__ban-description", `@${f.banIssuer}`))
    }
  }
  return result
}

var generatebanbody = function (f) {
  var result = []
  if (f.type == "timeout")
    result.push(m(".user-logs__ban-reason", l10n.get("BANS_TIMEOUT", f.duration)))
  if (f.type == "ban")
    result.push(m(".user-logs__ban-reason", l10n.get("BANS_PERMANENT")))
  if (f.type == "untimeout")
    result.push(m(".user-logs__ban-reason", l10n.get("BANS_UNTIMEOUT")))
  if (f.type == "unban")
    result.push(m(".user-logs__ban-reason", l10n.get("BANS_UNBAN")))
  if (f.banIssuer != "") {
    if (f.reason != "") {
      result.push(m(".user-logs__ban-description", `@${f.banIssuer} - ${l10n.get("REASON")}: "${f.reason}"`))
    } else {
      result.push(m(".user-logs__ban-description", `@${f.banIssuer}`))
    }
  }

  return result
}
export default {
  oninit: function (vnode) {
    model.state = states.LOADING

    vnode.state.route = m.route.get()
    model.get(m.route.param("channel"), m.route.param("userID"))
  },

  onupdate: function (vnode) {

    if (vnode.state.route == m.route.get())
      return
    model.state = states.LOADING
    vnode.state.route = m.route.get()
    model.get(m.route.param("channel"), m.route.param("userID"))
  },

  route: routes.LOGS,
  getTitle() {
    return l10n.get("USER_LOGS", !!model.result.user ? model.result.user : "", channelName.get(m.route.param("channel")))
  },
  view: function (vnode) {
    if (model.state == states.LOADING) {
      return m(loading)
    }
    return m(".user-logs", [

      !!model.result.messages ? m(".user-logs__block", [

        m("hgroup.user-logs__header", l10n.get("USER_LOGS", !!model.result.user ? model.result.user : "", channelName.get(m.route.param("channel")))), !!model.result.knownNicknames && model.result.knownNicknames.length > 1 ? l10n.get("USER_AKA", model.result.knownNicknames.join(", ")) : null,
        model.result.messages.map(f => {
            if (f.messageType == "timeout" || f.messageType == "ban" || f.messageType == "unban" || f.messageType == "untimeout") {
              return m(".user-logs__history", [
                m(".user-logs__history__row", [
                  m(".user-logs__history__ban", generateMessagebody(f)),
                  m(".user-logs__history__date", new Date(f.date).toLocaleString())
                ])
              ])
            }
            return m(".user-logs__history", [
              m(".user-logs__history__row", [
                m(".user-logs__history__username", "@" + f.username),
                m(".user-logs__history__date", new Date(f.date).toLocaleString())
              ]),
              m("div", {
                class: generateClass(f)
              }, f.messageBody)
            ])
          }

        )
      ]) : null, !!model.result.bans ? m(".user-logs__block", [
        m(".user-logs__header", l10n.get("USER_BANS", !!model.result.user ? model.result.user : "", channelName.get(m.route.param("channel")))),
        model.result.bans.map(f => m(".user-logs__ban-item", [
          m(".user-logs__ban-type", generatebanbody(f)),
          m(".user-logs__ban-date", new Date(f.date).toLocaleString())

        ]))
      ]) : ""

    ])
  }
};