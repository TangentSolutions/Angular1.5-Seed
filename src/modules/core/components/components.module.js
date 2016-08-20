import AppComponent from './app/app.component';
import CountComponent from './count/count.component';
import ListComponent from './list/list.component';
import WikiSearchComponent from './wiki-search/wiki-search.component';
import ContainerFluidComponent from './container-fluid/container-fluid.component';

export default angular.module('core.components', [])
    .component('app', AppComponent)
    .component('count', CountComponent)
    .component('list', ListComponent)
    .component('wikiSearch', WikiSearchComponent)
    .component('containerFluid', ContainerFluidComponent);
