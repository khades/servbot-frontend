var m = require("mithril")
require('../scss/style.scss')
var MainPageComponent = require("./mainPage/MainPageComponent")
var AfterAuthComponent = require("./afterAuth/AfterAuthComponent")
var LogsPageComponent = require("./logs/LogsPageComponent")
var LogUsersPageComponent = require("./logs/LogUsersPageComponent")
var TemplateListPageComponent = require("./channel/bot/TemplateListPageComponent")
var autoMessageList = require("./autoMessages/listPage")
var autoMessageEdit = require("./autoMessages/editPage")
var templateShow = require("./templates/show")
var channelIndex = require("./channel/index")
var subAlertShow = require("./subalert/show")
var time = require("./utils/time")
var subs = require("./subscriptions/show")
time.getTime()
m.route.prefix("#")
m.route(document.body, "/", {
  "/": MainPageComponent,
  "/afterAuth": AfterAuthComponent,
  //"/channelData": ChannelDataPageComponent,
  "/channel/:channel": channelIndex,
  "/channel/:channel/subs": subs,
  "/channel/:channel/templates": TemplateListPageComponent,
  "/channel/:channel/templates/:template": templateShow,
  "/channel/:channel/logs": LogUsersPageComponent,
  "/channel/:channel/logs/:userID": LogsPageComponent,
  "/channel/:channel/autoMessages": autoMessageList,
  "/channel/:channel/autoMessages/new": autoMessageEdit,
  "/channel/:channel/autoMessages/:id": autoMessageEdit,
  "/channel/:channel/subAlert": subAlertShow

});