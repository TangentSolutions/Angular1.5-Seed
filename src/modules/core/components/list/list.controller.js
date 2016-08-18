import { autorun } from 'mobx';

var ListController = function ($scope, ObservableService) {
  var $ctrl = this;

  $ctrl.$onInit = function () {
    autorun(() => {
      $ctrl.items = ObservableService.observable.items;
    });

    $ctrl.invalid = false;
    $ctrl.disable = true;
  };

  $ctrl.addItem = function () {
    ObservableService.add($ctrl.input);

    $ctrl.input = '';
    $ctrl.invalid = false;
    $ctrl.disable = true;
  };

  /* Example on async-change life cycle events before after and on change */
  $ctrl.beforeValidate = function (value) {
    $ctrl.disable = true;
  };

  $ctrl.onValidate = function (value) {
    $ctrl.invalid = false;
    return Rx.Observable.from([value]);
  };

  $ctrl.afterValidate = function (value) {
      if (value === undefined || value === '') {
        $ctrl.invalid = true;
      } else {
        $ctrl.disable = false;
        $ctrl.invalid = false;
      }
  };

};

ListController.$inject = ['$scope', 'ObservableService'];

export default ListController;
