import { autorun } from 'mobx';

var CountController = function ($scope, ObservableService) {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    autorun(() => {
      $ctrl.count = ObservableService.observable.items.length;
    })
  };
};

CountController.$inject = ['$scope', 'ObservableService'];

export default CountController;
