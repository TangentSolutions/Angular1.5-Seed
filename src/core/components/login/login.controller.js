class LoginController {
    constructor(AuthenticationService, toastr, $state, $resolve) {
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
