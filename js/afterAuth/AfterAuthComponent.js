import m from 'mithril';
import l10n from '../l10n/l10n';

var AfterAuthComponent = {
  oninit: (vnode) => {
    let route = localStorage.getItem("redirect");
    if (!!route) {
      m.route.set(route);
    } else m.route.set("/")
  },
  route: routes.CHANNELBANS,
  getTitle: () => {
    return l10n.get("REDIRECTING")
  },
  view: () => {
    return m(".redirect", l10n.get("REDIRECTING"))

  }
}

export default AfterAuthComponent;