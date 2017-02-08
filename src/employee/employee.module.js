import Components from './components/components.module';
import Services from './services/services.module';
import Directives from './directives/directives.module';
import Settings from './employee.settings';

export default angular.module('employee.module', [
    Components.name,
    Services.name,
    Directives.name,
    Settings.name
]);
