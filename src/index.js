import './index.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'angular-toastr/dist/angular-toastr.css';

import _ from 'underscore';
import bootstrap from 'bootstrap';
import angular from 'angular';

import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngCookies from 'angular-cookies';
import ngSanitize from 'angular-sanitize';
import ngTouch from 'angular-touch';
import uiBootstrap from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';
import toastr from 'angular-toastr';
import rx from 'rx-angular';

import CoreModule from './core/core.module';
import ProjectModule from './project/project.module';

angular.module('app', [
    CoreModule.name,
    ProjectModule.name,
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
    'ngInject';
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
            template:'<login resolve="$resolve"></login>',
            resolve: {
                test: function () {
                    return 'Something Else';
                }
            }
        })
        .state('state-a', {
            url: '/a',
            template: '<app></app>'
        })
        .state('state-b', {
            url: '/b/:name',
            template: '<app></app>'
        })
        .state('project:list', {
            url: '/projects',
            template: '<project-list></project-list>'
        })
        .state('project:update', {
            url: '/projects/update/:id',
            template: '<project-crud></project-crud>'
        })
        .state('project:create', {
            url: '/projects/create',
            template: '<project-crud></project-crud>'
        });
});

angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});
