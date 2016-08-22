class AppController {
    constructor($rootScope, $stateParams, RxServiceExample, toastr) {
        'ngInject';
        this.title = $stateParams.name ? 'Name Param: ' + $stateParams.name : 'No Name Param';

          toastr.success('Hello world!', 'Toastr fun!');
        RxServiceExample.get().subscribe((response) => {
            $rootScope.$evalAsync(() => {
                this.model = response;
            });
        });
    }
}

export default AppController;
