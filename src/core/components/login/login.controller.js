class LoginController {




    constructor(AuthenticationService, toastr, $state) {

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

            this.getMyProfile();
        }, () => {
            this.toastr.error('Login Failed');
        });
    }

    getMyProfile() {
        this.AuthenticationService.getMyProfile().then((result) => {

        }, () => {
            this.toastr.error('Get Profile Failed');
        });
    }
}

export default LoginController;
