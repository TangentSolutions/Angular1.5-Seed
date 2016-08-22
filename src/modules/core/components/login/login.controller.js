class LoginController {
    constructor($rootScope, $stateParams, AuthenticationService) {
        'ngInject';
        this.AuthenticationService = AuthenticationService;
    }

    login(){
        this.AuthenticationService.login(this.username, this.password).then((result) => {
            if(result.status === 200){
                this.showSuccess = true;
            }
        });
    }
}

export default LoginController;
