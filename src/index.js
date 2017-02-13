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
import EmployeeModule from './employee/employee.module';
import LeaveModule from './leave/leave.module';

angular.module('app', [
    CoreModule.name,
    EmployeeModule.name,
    LeaveModule.name,
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
        .state('employee:list', {
            url: '/employees',
            template: '<employee-list></employee-list>'
        })
        .state('employee:update', {
            url: '/employees/update/:id',
            template: '<employee-crud></employee-crud>'
        })
        .state('employee:create', {
            url: '/employees/create',
            template: '<employee-crud></employee-crud>'
        })
        .state('leave:list', {
<<<<<<< HEAD
          url: '/leave',
          template: '<leave-list></leave-list>'
=======
            url: '/leave',
            template: '<leave-list></leave-list>'
        })
        .state('leave:update', {
            url: '/leave/update/',
            template: '<leave-crud></leave-crud>'
        })
        .state('leave:create', {
            url: '/leave/create',
            template: '<leave-crud></leave-crud>'
>>>>>>> 27755fb56daeba80ae6c03af0a03cc3841816dcc
        });
});

angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});
