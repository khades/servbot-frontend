var m = require("mithril")
var MainPageComponent = require("./mainPage/MainPageComponent")
var AfterAuthComponent = require("./afterAuth/AfterAuthComponent")
var LogsPageComponent = require("./logs/LogsPageComponent")
var TemplateListPageComponent = require("./channel/bot/TemplateListPageComponent")
m.route.prefix("#");
m.route(document.body, "/", {
  "/": MainPageComponent,
  "/afterAuth": AfterAuthComponent,
  "/channelData": ChannelDataPageComponent,
  "/channel/:channel/bot/templates": TemplateListPageComponent,
  // "/channel/:channel/bot/templates/:template"
  "/logs/:channel/:username": LogsPageComponent,
  "/logs/:channel/:username/:page": LogsPageComponent,
});
