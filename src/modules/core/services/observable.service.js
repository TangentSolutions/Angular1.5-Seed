import { observable } from 'mobx';

let ObservableService = function () {
  this.add = function (value) {
    this.observable.items.push({value: value});
  };

  return {
    add: this.add,
    observable: observable({
      items: []
    })
  };
}

export default ObservableService;
