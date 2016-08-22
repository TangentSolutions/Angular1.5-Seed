import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngCookies from 'angular-cookies';
import ngSanitize from 'angular-sanitize';
import ngTouch from 'angular-touch';
import uiBootstrap from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';
import rx from 'rx-angular';

import toastr from 'toastr';
import 'toastr/dist/angular-toastr.min.css!';

import $ from 'jquery';
import bootstrap from 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

import _ from 'underscore';

import CoreModule from './modules/core/core.module';

angular.module('app', [
    CoreModule.name,
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.router',
    'rx',
    'toastr'
]).config(($stateProvider, $urlRouterProvider, toastrConfig) => {
    'ngInject';

    angular.extend(toastrConfig, {
      autoDismiss: true,
      containerId: 'toast-container',
      maxOpened: 3,
      newestOnTop: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      target: 'body'
    });

    $urlRouterProvider.otherwise('/a');

    $stateProvider
        .state('CoreStateA', {
            url: '/a',
            template: '<app></app>'
        })
        .state('CoreStateB', {
            url: '/b/:name',
            template: '<app></app>'
        });
});

angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});
