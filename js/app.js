var m = require("mithril")
require('../scss/style.scss')
var MainPageComponent = require("./mainPage/MainPageComponent")
var AfterAuthComponent = require("./afterAuth/AfterAuthComponent")
var LogsPageComponent = require("./logs/LogsPageComponent")
var LogUsersPageComponent = require("./logs/LogUsersPageComponent")
var templatesList= require("./templates/list")
var autoMessageList = require("./autoMessages/listPage")
var autoMessageEdit = require("./autoMessages/editPage")
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
time.getTime()
m.route.prefix("#")
m.route(document.body, "/", {
  "/": MainPageComponent,
  "/afterAuth": AfterAuthComponent,
  //"/channelData": ChannelDataPageComponent,
  "/channel/:channel": channelIndex,
  "/channel/:channel/subs": subs,
  "/channel/:channel/templates": templatesList,
  "/channel/:channel/templates/:template": templateShow,
  "/channel/:channel/logs": LogUsersPageComponent,
  "/channel/:channel/logs/:userID": LogsPageComponent,
  "/channel/:channel/autoMessages": autoMessageList,
  "/channel/:channel/autoMessages/new": autoMessageEdit,
  "/channel/:channel/autoMessages/:id": autoMessageEdit,
  "/channel/:channel/subAlert": subAlertShow,
  "/channel/:channel/bits": bits,
  "/channel/:channel/bits/:user": userbits,
  "/channel/:channel/externalservices":externalServices,
  "/channel/:channel/subtrain": subtrain,
  "/channel/:channel/bans": bans,
  "/channel/:channel/subdays": subdayList,
  "/channel/:channel/subdays/:subdayID": subday
});