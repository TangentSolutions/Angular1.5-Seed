import Components from './components/components.module';
import Services from './services/services.module';
import Directives from './directives/directives.module';
import Settings from './project.settings';

export default angular.module('project.module', [
    Components.name,
    Services.name,
    Directives.name,
    Settings.name
]);
