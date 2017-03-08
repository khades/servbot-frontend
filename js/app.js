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

m.route.prefix("#") 
m.route(document.body, "/", {
  "/": MainPageComponent,
  "/afterAuth": AfterAuthComponent,
  //"/channelData": ChannelDataPageComponent,
  "/channel/:channel": channelIndex,

  "/channel/:channel/templates": TemplateListPageComponent,
  "/channel/:channel/templates/:template": templateShow,
  "/channel/:channel/logs": LogUsersPageComponent,
  "/channel/:channel/logs/:username": LogsPageComponent,
  "/channel/:channel/logs/:username/:page": LogsPageComponent,
  "/channel/:channel/autoMessages": autoMessageList,
  "/channel/:channel/autoMessages/new": autoMessageEdit,
  "/channel/:channel/autoMessages/:id": autoMessageEdit,
  "/channel/:channel/subAlert": subAlertShow

});