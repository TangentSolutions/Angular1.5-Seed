import angular from 'angular';

import MockService from './mock.service';
import ObservableService from './observable.service';

export default angular.module('CoreServices',[])
  .service('MockService', MockService)
  .service('ObservableService', ObservableService)
  .name;
