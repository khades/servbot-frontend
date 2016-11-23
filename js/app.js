var m = require("mithril")
var MainPageComponent = require("./mainPage/MainPageComponent")
var AfterAuthComponent = require("./afterAuth/AfterAuthComponent")
var LogsPageComponent = require("./logs/LogsPageComponent")
var LogUsersPageComponent = require("./logs/LogUsersPageComponent")

var TemplateListPageComponent = require("./channel/bot/TemplateListPageComponent")
m.route.prefix("#");
m.route(document.body, "/", {
  "/": MainPageComponent,
  "/afterAuth": AfterAuthComponent,
  //"/channelData": ChannelDataPageComponent,
  "/channel/:channel/bot/templates": TemplateListPageComponent,
  // "/channel/:channel/bot/templates/:template"
  "/channel/:channel/logs": LogUsersPageComponent,
  "/channel/:channel/logs/:username": LogsPageComponent,
  "/channel/:channel/logs/:username/:page": LogsPageComponent
});