import * as m from "mithril"

import MainPageComponent from "./mainPage/MainPageComponent"
import AfterAuthComponent from "./afterAuth/AfterAuthComponent"
import LogsPageComponent from "./logs/LogsPageComponent"
import LogUsersPageComponent from "./logs/LogUsersPageComponent"
import TemplateListPageComponent from "./channel/bot/TemplateListPageComponent"
m.route.prefix("#");
m.route(document.body, "/", {
  "/": MainPageComponent,
  "/afterAuth": AfterAuthComponent,
  //"/channelData": ChannelDataPageComponent,
  "/channel/:channel/templates": TemplateListPageComponent,
  // "/channel/:channel/bot/templates/:template"
  "/channel/:channel/logs": LogUsersPageComponent,
  "/channel/:channel/logs/:username": LogsPageComponent,
  "/channel/:channel/logs/:username/:page": LogsPageComponent
});