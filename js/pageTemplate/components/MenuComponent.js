import m from 'mithril';

// var Hammer = require("hammerjs")
import '../../../scss/modules/_site-menu.scss';
import UserNameModel from '../models/UserNameModel';

import routes from '../routes';
import channelName from '../../utils/channelName';
import l10n from '../../l10n/l10n';
var MenuComponent = {
    oncreate: function (vnode) {
        // new Hammer(vnode.dom).on("swipeleft", function (ev) {
        //     vnode.attrs.hideMenu()
        //     m.redraw()
        // })
        // new Hammer(vnode.dom).on("swiperight", function (ev) {
        //     vnode.attrs.showMenu()
        //     m.redraw()
        // })
    },

    view: function (vnode) {
        var components = [

            // m("a", {
            //     href: "/",
            //     oncreate: m.route.link,
            //     class: vnode.attrs.route == routes.MAIN ? "is-selected" : ""
            // }, m("span", l10n.get("MAIN_PAGE"))),
        ]
        if (!!m.route.param("channel") && m.route.param("channel") != "") {
            components.push(
                m("a.site-menu__header", {
                    href: `/channel/${m.route.param("channel")}`,
                    oncreate: m.route.link,
                    //   class: vnode.attrs.route == routes.CHANNEL ? "is-selected" : ""
                },[
                    !!UserNameModel.profileImage ? m("img", {
                        src: UserNameModel.profileImage
                    }):null,
                    m(".site-menu__header-info", [

                        m("div", `${UserNameModel.userName}`),
                        m("span", l10n.get("CHANNEL", channelName.get(m.route.param("channel"))))
                    ])
                ]))
            components.push(
                m("a.site-menu__link", {
                    href: `/channel/${m.route.param("channel")}/logs`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.LOGS ? "is-selected" : ""
                }, m("span", l10n.get("MESSAGE_LOGS"))))
            components.push(
                m("a.site-menu__link", {
                    href: `/channel/${m.route.param("channel")}/bans`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.CHANNELBANS ? "is-selected" : ""
                }, m("span", l10n.get("BANS"))))
            components.push(
                m("a.site-menu__link", {
                    href: `/channel/${m.route.param("channel")}/templates`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.TEMPLATES ? "is-selected" : ""
                }, m("span", l10n.get("COMMANDS"))))
            components.push(
                m("a.site-menu__link", {
                    href: `/channel/${m.route.param("channel")}/subAlert`,
                    oncreate: m.route.link,
                    class: vnode.attrs.route == routes.SUBALERT ? "is-selected" : ""
                }, m("span", l10n.get("SUBALERTS"))))
            components.push(
                m("a.site-menu__link", {
                    href: `/channel/${m.route.param("channel")}/autoMessages`,
                    class: vnode.attrs.route == routes.AUTOMESSAGES ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", l10n.get("AUTOMESSAGES"))))
            components.push(
                m("a.site-menu__link", {
                    href: `/channel/${m.route.param("channel")}/songrequests`,
                    class: vnode.attrs.route == routes.SONGREQUESTS ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", l10n.get("SONGREQUESTS"))))
            components.push(
                m("a.site-menu__link", {
                    href: `/channel/${m.route.param("channel")}/subdays`,
                    class: vnode.attrs.route == routes.SUBDAY ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", l10n.get("SUBDAYS"))))
            components.push(
                m("a.site-menu__link", {
                    href: `/channel/${m.route.param("channel")}/subs`,
                    class: vnode.attrs.route == routes.SUBSCRIPTIONS ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", l10n.get("SUBSCRIPTIONS"))))
            // components.push(
            //     m("a", {
            //         href: `/channel/${m.route.param("channel")}/bits`,
            //         class: vnode.attrs.route == routes.BITS ? "is-selected" : "",
            //         oncreate: m.route.link
            //     }, m("span", "Битсы")))
            components.push(
                m("a.site-menu__link", {
                    href: `/channel/${m.route.param("channel")}/externalservices`,
                    class: vnode.attrs.route == routes.EXTERNAL_SERVICES ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", l10n.get("EXTERNAL_SERVICES"))))
            components.push(
                m("a.site-menu__link", {
                    href: `/channel/${m.route.param("channel")}/subtrain`,
                    class: vnode.attrs.route == routes.SUBTRAIN ? "is-selected" : "",
                    oncreate: m.route.link
                }, m("span", l10n.get("SUBTRAIN"))))
        } else {
            components.push(m(".site-menu__user-info", [
                m("img", {
                    src: "https://static-cdn.jtvnw.net/jtv_user_pictures/d7bbfe70-9962-4e76-8a10-267a0cea9a64-profile_image-300x300.png"
                }),
                m("div", `${UserNameModel.userName}`)
            ]))
        }
        return m(".site-menu", {
                onclick: e => {
                    vnode.attrs.closeMenu()
                }
            },
            components)
    }
}

export default MenuComponent;