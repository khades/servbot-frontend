var m = require("mithril")
var TemplateListModel = require('../models/TemplateListModel')
var TemplateListItemComponent = require("./TemplateListItemComponent")
var TemplateListPageComponent = {
    view: function (vnode) {
        return m(".template-list", [
            m(".template-list__filter", [
                m("button.template-list__filter__template", {
                    class: TemplateListModel.showTemplate == true ? "" : "disabled",
                    type: "button",
                    onclick: f => {
                        if (TemplateListModel.showTemplate == true)
                            TemplateListModel.showTemplate = false
                        else
                            TemplateListModel.showTemplate = true
                    }

                }, m(".button-content",[m(`span.sprite`), m("span.text", "Команда")])),
                m("button.template-list__filter__alias", {

                    class: TemplateListModel.showAlias == true ? "" : "disabled",
                    type: "button",
                    onclick: f => {
                        if (TemplateListModel.showAlias == true)
                            TemplateListModel.showAlias = false
                        else
                            TemplateListModel.showAlias = true
                    }
                }, m(".button-content", [m(`span.sprite`), m("span.text", "Алиас")])),
                m("button.template-list__filter__deleted", {
                    class: TemplateListModel.showDeleted == true ? "" : "disabled",
                    type: "button",
                    onclick: f => {
                        if (TemplateListModel.showDeleted == true)
                            TemplateListModel.showDeleted = false
                        else
                            TemplateListModel.showDeleted = true
                    }
                },m(".button-content", [m(`span.sprite-delete-outline`), m(`span.sprite`), m("span.text", "Удалено")]))

            ]),
            m(".template-list__container", TemplateListModel.getTemplates().map(f => m(TemplateListItemComponent, {
                item: f
            })))
        ])
    }
}

module.exports = TemplateListPageComponent