import Components from './components/components.module';
import Services from './services/services.module';
import Directives from './directives/directives.module';

export default angular.module('core.module', [
    Components.name,
    Services.name,
    Directives.name
]);
