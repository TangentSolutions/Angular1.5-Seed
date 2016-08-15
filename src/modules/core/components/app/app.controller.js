var AppController = function ($rootScope, MockService) {
  var $ctrl = this;
  //Evaluate Async Response Within AngularJS Context i.e. RxJS / ES6(Promise) / Why Not Both?
  MockService.get().subscribe((response) => {
    $rootScope.$evalAsync(() => {
      $ctrl.model = response;
    })
  });
}

AppController.$inject = ['$rootScope', 'MockService'];

export default AppController;
