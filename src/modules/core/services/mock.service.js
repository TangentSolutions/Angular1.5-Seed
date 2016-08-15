var MockService = function (rx) {
  this.get = function () {
    return rx.Observable.fromPromise(Promise.resolve({text: 'Application'}))
  };

  return {
    get: this.get
  };
};

// AngularJS dependency injection inject other services here i.e.
MockService.$inject = ['rx'];

export default MockService;
