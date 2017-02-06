class LoginController {
<<<<<<< HEAD

    constructor(AuthenticationService, toastr, $state) {

=======
    constructor(AuthenticationService, toastr, $state) {
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
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
