import angular from 'angular';

import MockService from './mock.service';
import ObservableService from './observable.service';

export default angular.module('core.services',[])
  .service('MockService', MockService)
  .service('ObservableService', ObservableService)
  .name;
