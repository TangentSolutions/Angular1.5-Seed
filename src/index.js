import angular from 'angular';


import $ from 'jquery';
import _ from 'underscore';


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


import bootstrap from 'bootstrap/js/bootstrap';
import 'bootstrap/css/bootstrap.css!';
import 'font-awesome';

import CoreModule from './modules/core/core.module';

console.log(CoreModule);
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
])
.run(($rootScope, AuthenticationService, $state) => {
    //Force Login
    $rootScope.$on('$locationChangeStart', (state) => {
        if (!AuthenticationService.isLoggedIn()) {
            $state.go('login');
        }
    });
    //Redirect to default state
    $rootScope.$on('$stateChangeSuccess', (event) => {
        if ($state.is('login') && AuthenticationService.isLoggedIn()) {
            $state.go('state-a');
        }
    });
})
.config(($stateProvider, $urlRouterProvider, toastrConfig) => {
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
        .state('login', {
            url:'/login',
            template:'<login></login>'
        })
        .state('state-a', {
            url: '/a',
            template: '<app></app>'
        })
        .state('state-b', {
            url: '/b/:name',
            template: '<app></app>'
        });
});

angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});
