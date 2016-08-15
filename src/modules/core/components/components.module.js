import angular from 'angular';

import AppComponent from './app/app.component';
import CountComponent from './count/count.component';
import ListComponent from './list/list.component';

export default angular.module('components',[])
  .component('app', AppComponent)
  .component('count', CountComponent)
  .component('list', ListComponent)
  .name;
