import m from 'mithril';
import PageTemplateComponent from '../pageTemplate/PageTemplateComponent';
import model from './models/userbits';
import component from './components/userbits';
import routes from '../pageTemplate/routes';
import channelName from '../utils/channelName';


export default {
    render() {
        return m(PageTemplateComponent, {
            route: routes.BITS,
            title: `История битсов пользователя ${model.result.user} на канале ${channelName.get(m.route.param("channel"))}`,
            content: m(component),

        })

    }
};