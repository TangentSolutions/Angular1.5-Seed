import angular from 'angular';

import CoreModule from './modules/core/core.module';

//Import angular modules
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngCookies from 'angular-cookies';
import ngSanitize from 'angular-sanitize';
import ngTouch from 'angular-touch';
import rx from 'rx-angular';

import { CoreStateA, CoreStateB } from './modules/core/core.states';

//Load angular modules
angular.module('app', [
  //Our Modules
  CoreModule,
  //External Modules
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngSanitize',
  'ngTouch',
  'ui.router',
  'rx'
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  ($stateProvider, $urlRouterProvider, $locationProvider) => {

    $urlRouterProvider.otherwise('/core-a');

    $stateProvider
      .state('CoreStateA', {
        url: '/core-a',
        template: CoreStateA
      })
      .state('CoreStateB', {
        url: '/core-b/:name',
        template: CoreStateB
      });
  }
]);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['app']);
});
