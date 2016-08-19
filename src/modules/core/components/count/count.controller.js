import { autorun } from 'mobx';

class CountController{
  constructor($scope, ObservableService) {
    'ngInject';

    this.observableService = ObservableService;
  }

  $onInit() {
    autorun(() => {
      this.count = this.observableService.observable.length;
    })
  }
}

export default CountController;
