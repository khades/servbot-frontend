import m from 'mithril';
import '../../../scss/modules/_template-history.scss';

export default {
    view(vnode) {
        return m(".template-history", [
            m(".template-history__row", [
                m(".template-history__user", [
                    `${vnode.attrs.user}`,
                    m(".template-history__user__tooltip", `${vnode.attrs.user}#${vnode.attrs.userID}`)
                ]),

                m(".template-history__date", new Date(vnode.attrs.date).toLocaleString())
            ]),
            m(".template-history__body", vnode.attrs.template)

        ])
    }
};