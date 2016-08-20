import RxServiceExample from './rx-example.service';
import MobxServiceExample from './mobx-example.service';
import WikiSearchService from './wiki-search.service';

export default angular.module('core.services', [])
    .service('RxServiceExample', RxServiceExample)
    .service('WikiSearchService', WikiSearchService)
    .service('MobxServiceExample', MobxServiceExample);
