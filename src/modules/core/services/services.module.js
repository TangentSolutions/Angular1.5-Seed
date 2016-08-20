import angular from 'angular';

import RxServiceExample from './rx.example.service';
import MobxServiceExample from './mobx.example.service';

export default angular.module('core.services', [])
    .service('RxServiceExample', RxServiceExample)
    .service('MobxServiceExample', MobxServiceExample)
    .name;
