import angular from 'angular';

import Components from './components/components.module';
import Services from './services/services.module';

export default angular.module('core.module', [
  Components,
  Services
]).name;
