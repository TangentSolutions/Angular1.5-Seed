import angular from 'angular';

//Bootstrap
import jquery from 'jquery';
import bootstrap from 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

//Internal Modules
import CoreModule from './modules/core/core.module';

//Import angular modules
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngCookies from 'angular-cookies';
import ngSanitize from 'angular-sanitize';
import ngTouch from 'angular-touch';
import uiBootstrap from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';
import rx from 'rx-angular';


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
        'ui.bootstrap',
        'ui.router',
        'rx'
    ])
    .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
        'ngInject';

        $urlRouterProvider.otherwise('/core-a');

        $stateProvider
            .state('CoreStateA', {
                url: '/core-a',
                template: '<app></app>'
            })
            .state('CoreStateB', {
                url: '/core-b/:name',
                template: '<app></app>'
            });
    });

angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});
