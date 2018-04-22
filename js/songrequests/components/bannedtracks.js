import m from 'mithril'
import input from '../../basicWidgets/input'
import l10n from '../../l10n/l10n'
import model from '../models/bannedtracks'
import paginator from '../../basicWidgets/paginator'
import states from '../../utils/states'
import loading from '../../basic/loading'
import item from './bannedtracksItem'
import '../../../scss/modules/_songrequests-library.scss'

export default {
    oninit() {
        model.page = 1
        model.get()
    },
    view() {
        if (model.state == states.LOADING) {
            return m(loading)
        }
        return m(".songrequests-library", [
            m(".songrequests-library__header", l10n.get("SONGREQUESTS_BANNED_TRACKS")),
            model.data.items.map(f => m(item, f)),
            m(paginator, {
                getPage: function () {
                    return model.getPage()
                },
                pages: Math.ceil(model.data.count / 25),
                setPage: function (value) {
                    model.setPage(value)
                }
            })
        ])
    }
}