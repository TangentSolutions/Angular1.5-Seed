import RxServiceExample from './rx-example.service';
import MobxServiceExample from './mobx-example.service';
import WikiSearchService from './wiki-search.service';
import AuthenticationService from './authentication.service';

//Register your services
export default angular.module('core.services', [])
    .service('RxServiceExample', RxServiceExample)
    .service('WikiSearchService', WikiSearchService)
    .service('MobxServiceExample', MobxServiceExample)
    .service('AuthenticationService', AuthenticationService);
