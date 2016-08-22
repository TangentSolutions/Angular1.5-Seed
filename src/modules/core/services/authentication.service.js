/**
 * Example
 */
class AuthenticationService {
    constructor($http, $q, $cookies,
                AUTH_SERVICE_BASE_URI) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
        this.$cookies = $cookies;
        this.BASE_URI = AUTH_SERVICE_BASE_URI;
    }

    login(username, password) {
        var deferred = this.$q.defer();
        var url = this.BASE_URI + 'api-token-auth/';

        this.$http.post(url, {
            username: username, password: password
        }).then((response) => {
            if (response.data.token) {
                this.$cookies.put('token', response.data.token);
            }
            deferred.resolve(response);
        }, (response) => {
            deferred.reject(response);
        });

        return deferred.promise;
    }

    logout() {
        this.$cookies.remove('token');
    }

    isLoggedIn() {
        return this.$cookies.get('token') !== '' &&  this.$cookies.get('token') !== undefined ? true : false;
    }


}

export default AuthenticationService;
