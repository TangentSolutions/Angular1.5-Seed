class AppController {
  constructor($rootScope, $stateParams, MockService) {
    'ngInject';

    this.title = $stateParams.name ? 'Name Param: ' + $stateParams.name : 'No Name Param';

    MockService.get().subscribe((response) => {
      $rootScope.$evalAsync(() => {
        this.model = response;
      })
    });
  }
}

export default AppController;
