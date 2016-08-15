import template from './count.template.html!text';
import { autorun } from 'mobx';

export default {
  template: template,
  controller: ['$scope', 'ObservableService', function ($scope, ObservableService) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      autorun(() => {
        $ctrl.count = ObservableService.observable.items.length;
      })
    };
  }],
  controllerAs: '$ctrl'
};
