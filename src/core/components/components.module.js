import AppComponent from './app/app.component';
import CountComponent from './count/count.component';
import ListComponent from './list/list.component';
import WikiSearchComponent from './wiki-search/wiki-search.component';
import ContainerFluidComponent from './container-fluid/container-fluid.component';
import LoginComponent from './login/login.component';
import LogoutComponent from './logout/logout.component';
import LoaderComponent from './loader/loader.component';

export default angular.module('core.components', [])
    .component('app', AppComponent)
    .component('count', CountComponent)
    .component('list', ListComponent)
    .component('wikiSearch', WikiSearchComponent)
    .component('containerFluid', ContainerFluidComponent)
    .component('login', LoginComponent)
    .component('logout', LogoutComponent)
    .component('loader', LoaderComponent);
