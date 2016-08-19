class AppController {
  
  constructor($rootScope, $stateParams, MockService) {
    var $ctrl = this;

    $ctrl.title = $stateParams.name ? 'Name Param: ' + $stateParams.name : 'No Name Param';

    MockService.get().subscribe((response) => {
      $rootScope.$evalAsync(() => {
        $ctrl.model = response;
      })
    });
  }

}

AppController.$inject = ['$rootScope', '$stateParams', 'MockService'];

export default AppController;
