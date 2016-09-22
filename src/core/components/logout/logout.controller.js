class LogoutController {
    constructor(AuthenticationService, $state) {
        'ngInject';

        this.AuthenticationService = AuthenticationService;
        this.$state = $state;
    }

    logout() {
        this.AuthenticationService.logout();
        this.$state.go('login');
    }
}

export default LogoutController;
