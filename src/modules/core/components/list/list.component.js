import template from './list.template.html!text';

import './list.style.css!';

import {autorun} from 'mobx';

export default {
  template: template,
  controller: ['$scope', 'ObservableService', function ($scope, ObservableService) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      autorun(() => {
        $ctrl.items = ObservableService.observable.items;
      })
    };

    $ctrl.addItem = function () {
      ObservableService.add($ctrl.input);
      $ctrl.input = '';
    };
  }],
  controllerAs: '$ctrl'
};
