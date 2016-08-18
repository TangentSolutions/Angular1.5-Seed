import {autorun} from 'mobx';

var ListController = function ($scope, ObservableService) {
  var $ctrl = this;
  $ctrl.invalid = false;

  $ctrl.$onInit = function () {
    autorun(() => {
      $ctrl.items = ObservableService.observable.items;
    })
  };

  $ctrl.addItem = function () {
    ObservableService.add($ctrl.input);
    $ctrl.input = '';
  };

  $ctrl.beforeValidate = function (value) {

    $ctrl.invalid = false;
    return Rx.Observable.from([value]);
  };

  //This is called asynchronously use $evalAsync
  $ctrl.afterValidate = function (value) {
      if (value === undefined || value === '') {
        $ctrl.invalid = true;
      } else {
        $ctrl.invalid = false;
      }
  };
};

ListController.$inject = ['$scope', 'ObservableService'];

export default ListController;
