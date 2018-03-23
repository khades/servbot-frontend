var m = require("mithril")
require('../scss/style.scss')
var PageTemplateComponent = require('./pageTemplate/PageTemplateComponent')
var mainPage = require("./mainPage/mainPage")
var AfterAuthComponent = require("./afterAuth/AfterAuthComponent")
var logs = require("./logs/logs")
var logsUsers = require("./logs/users")
var templatesList = require("./templates/list")
var autoMessageList = require("./autoMessages/list")
var autoMessageEdit = require("./autoMessages/edit")
var templateShow = require("./templates/show")
var channelIndex = require("./channel/index")
var subAlertShow = require("./subalert/show")
var time = require("./utils/time")
var subs = require("./subscriptions/show")
var bits = require("./bits/bits")
var userbits = require("./bits/userbits")
var externalServices = require("./externalServices/externalServices")
var subtrain = require("./subTrain/subtrain")
var bans = require("./bans/bans")
var subdayList = require("./subday/list")
var subday = require("./subday/subday")
var songrequests = require('./songrequests/songrequests')
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
  "/channel/:channel/externalservices": externalServices,
  "/channel/:channel/subtrain": carcass(subtrain),
  "/channel/:channel/bans": carcass(bans),
  "/channel/:channel/subdays": carcass(subdayList),
  "/channel/:channel/subdays/:subdayID": carcass(subday),
  "/channel/:channel/songrequests": songrequests
});