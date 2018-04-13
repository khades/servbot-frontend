import m from 'mithril';
import PageTemplateComponent from '../pageTemplate/PageTemplateComponent';
import model from './models/bits';
import component from './components/bits';
import routes from '../pageTemplate/routes';
import channelName from '../utils/channelName';

export default {
    render() {
        return m(PageTemplateComponent, {
            route: routes.BITS,
            title: "Список людей, поддержавших канал",
            content: m(component, {
                result: model.result,
                channelID: m.route.param("channel")
            }),

        })

    }
};