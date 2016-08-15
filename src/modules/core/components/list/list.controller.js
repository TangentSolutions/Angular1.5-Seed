import {autorun} from 'mobx';

var ListController = function ($scope, ObservableService) {
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
};

ListController.$inject = ['$scope', 'ObservableService'];

export default ListController;
