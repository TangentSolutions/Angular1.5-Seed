class AppController {
    constructor($rootScope, $stateParams, RxServiceExample) {
        'ngInject';
        this.title = $stateParams.name ? 'Name Param: ' + $stateParams.name : 'No Name Param';

        RxServiceExample.get().subscribe((response) => {
            $rootScope.$evalAsync(() => {
                this.model = response;
            });
        });
    }
}

export default AppController;
