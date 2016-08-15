import angular from 'angular';

import AppComponent from './app/app.component';
import CountComponent from './count/count.component';
import ListComponent from './list/list.component';
import ContainerFluidComponent from './container-fluid/container-fluid.component';

export default angular.module('CoreComponents',[])
  .component('app', AppComponent)
  .component('count', CountComponent)
  .component('list', ListComponent)
  .component('containerFluid', ContainerFluidComponent)
  .name;
