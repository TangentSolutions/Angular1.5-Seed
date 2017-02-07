class LoginController {
<<<<<<< HEAD
    constructor(AuthenticationService, toastr, $state, ) {
=======
    constructor(AuthenticationService, toastr, $state) {
>>>>>>> 5a0fc3d553ab309cb7be76a8fafbce5cc53a21fc
        'ngInject';
        console.log(this.resolve);
        this.AuthenticationService = AuthenticationService;
        this.toastr = toastr;
        this.$state = $state;
    }

    login() {
        this.AuthenticationService.login(this.username, this.password).then((result) => {
            this.$state.go('state-a');
            this.toastr.success('Login Successful');
        }, () => {
            this.toastr.error('Login Failed');
        });
    }
}

export default LoginController;
