import m from 'mithril';
import '../../../scss/modules/_subalert-history.scss';
import l10n from '../../l10n/l10n';

export default {
    view(vnode) {

        return m(".subalert-history", [
            m(".subalert-history__row", [
                m(".subalert-history__user", [
                    `@${vnode.attrs.user}`,
                    m(".subalert-history__user__tooltip", `${vnode.attrs.user}#${vnode.attrs.userID}`)
                ]),
                m(".subalert-history__date", new Date(vnode.attrs.date).toLocaleString())
            ]),
            vnode.attrs.extended ? [
                m(".subalert-history__follower", [
                    m("div.subalert-history__label", "Follower"),
                    m(".subalert-history__sub-message", vnode.attrs.followerMessage)
                ]),
                m(".subalert-history__prime", [
                    m("div.subalert-history__label", "Prime"),
                    m(".subalert-history__sub-message", vnode.attrs.subPrimeMessage),
                    m(".subalert-history__resub-message", vnode.attrs.resubPrimeMessage),
                    m(".subalert-history__repeat-body", vnode.attrs.resubPrimeSmile)
                ]),
                m(".subalert-history__five", [
                    m("div.subalert-history__label", "5$"),
                    m(".subalert-history__sub-message", vnode.attrs.subFiveMessage),
                    m(".subalert-history__resub-message", vnode.attrs.resubFiveMessage),
                    m(".subalert-history__repeat-body", vnode.attrs.resubFiveSmile)
                ]),
                m(".subalert-history__ten", [
                    m("div.subalert-history__label", "10$"),
                    m(".subalert-history__sub-message", vnode.attrs.subTenMessage),
                    m(".subalert-history__resub-message", vnode.attrs.resubTenMessage),
                    m(".subalert-history__repeat-body", vnode.attrs.resubTenSmile)
                ]),
                m(".subalert-history__twenty-five", [
                    m("div.subalert-history__label", "25$"),
                    m(".subalert-history__sub-message", vnode.attrs.subTwentyFiveMessage),
                    m(".subalert-history__resub-message", vnode.attrs.resubTwentyFiveMessage),
                    m(".subalert-history__repeat-body", vnode.attrs.resubTwentyFiveMessage)
                ])
            ] : [
                m(".subalert-history__follower", [
                    m("div.subalert-history__label", "Follower"),
                    m(".subalert-history__sub-message", vnode.attrs.followerMessage)
                ]),
                m(".subalert-history__five", [
                    m("div.subalert-history__label", "Subscription"),
                    m(".subalert-history__sub-message", vnode.attrs.subFiveMessage),
                    m(".subalert-history__resub-message", vnode.attrs.resubFiveMessage),
                    m(".subalert-history__repeat-body", vnode.attrs.resubFiveSmile),
                ])
            ]
        ])
    }
};