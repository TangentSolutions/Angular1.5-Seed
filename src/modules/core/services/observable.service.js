import { observable } from 'mobx';

class ObservableService {
  constructor() {
      this.observable = observable({
        items: [],
        length: function () {
          return this.items.length;
        }
      });
  }

  add(value) {
    this.observable.items.push({value: value});
  }
}

export default ObservableService;
