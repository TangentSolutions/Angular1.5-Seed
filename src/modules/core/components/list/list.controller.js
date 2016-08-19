import { autorun } from 'mobx';

class ListController {
  constructor(ObservableService) {
    'ngInject';

    this.observableService = ObservableService;

    //Bind functions to current controller since they are called from somewhere else
    this.afterValidate = this.afterValidate.bind(this);
    this.beforeValidate = this.beforeValidate.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  $onInit() {
    autorun(() => {
      this.items = this.observableService.observable.items;
    });

    this.invalid = false;
    this.disable = true;
  }

  addItem() {
    this.observableService.add(this.input);

    this.input = '';
    this.invalid = false;
    this.disable = true;
  }

  beforeValidate(value) {
    this.disable = true;
    this.invalid = false;
  }

  onValidate(value) {
    return Rx.Observable.from([value]);
  }

  afterValidate(value) {
      if (value === undefined || value === '') {
        this.invalid = true;
      } else {
        this.disable = false;
        this.invalid = false;
      }
  }
}

export default ListController;
