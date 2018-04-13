if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (search, pos) {
    return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
  };
}

import m from 'mithril'
import '../scss/style.scss'
import PageTemplateComponent from './pageTemplate/PageTemplateComponent'
import mainPage from './mainPage/mainPage'
import AfterAuthComponent from './afterAuth/AfterAuthComponent'
import logs from './logs/logs'
import logsUsers from './logs/users'
import templatesList from './templates/list'
import autoMessageList from './autoMessages/list'
import autoMessageEdit from './autoMessages/edit'
import templateShow from './templates/show'
import channelIndex from './channel/index'
import subAlertShow from './subalert/show'
import time from './utils/time'
import subs from './subscriptions/show'
import bits from './bits/bits'
import userbits from './bits/userbits'
import externalServices from './externalServices/externalServices'
import subtrain from './subTrain/subtrain'
import bans from './bans/bans'
import subdayList from './subday/list'
import subday from './subday/subday'
import songrequests from './songrequests/songrequests'

time.getTime()
m.route.prefix("#")

function carcass(component) {
  return {
    render() {
      return m(PageTemplateComponent, {
        component: component
      })
    }
  }
}

function carcassAsync(path) {
  return {
    onmatch() {
      return path.then(component => {
        return m(component.default)

      })
    }
  }
}

m.route(document.body, "/", {
  "/": carcass(mainPage),
  "/afterAuth": carcass(AfterAuthComponent),
  "/channel/:channel": carcass(channelIndex),
  "/channel/:channel/subs": carcass(subs),
  "/channel/:channel/templates": carcass(templatesList),
  "/channel/:channel/templates/:template": carcass(templateShow),
  "/channel/:channel/logs": carcass(logsUsers),
  "/channel/:channel/logs/:userID": carcass(logs),
  "/channel/:channel/autoMessages": carcass(autoMessageList),
  "/channel/:channel/autoMessages/new": carcass(autoMessageEdit),
  "/channel/:channel/autoMessages/:id": carcass(autoMessageEdit),
  "/channel/:channel/subAlert": carcass(subAlertShow),
  // "/channel/:channel/bits": bits,
  // "/channel/:channel/bits/:user": userbits,
  "/channel/:channel/externalservices": carcass(externalServices),
  "/channel/:channel/subtrain": carcass(subtrain),
  "/channel/:channel/bans": carcass(bans),
  "/channel/:channel/subdays": carcass(subdayList),
  "/channel/:channel/subdays/:subdayID": carcass(subday),
  "/channel/:channel/songrequests": carcass(songrequests)
});