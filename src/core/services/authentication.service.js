/**
 * Example
 */
class AuthenticationService {
    constructor($http, $cookies, $q,
        AUTH_SERVICE_BASE_URI, USER_SERVICE_BASE_URI) {
        'ngInject';
        this.$http = $http;
        this.$cookies = $cookies;
        this.$q = $q;

        this.BASE_URI = AUTH_SERVICE_BASE_URI;
        this.USER_SERVICE_BASE_URI = USER_SERVICE_BASE_URI;
    }

    _getAuthToken() {
        return this.$cookies.get('token');
    }

    __getHeaders() {
        return {
            Authorization: 'Token ' + this._getAuthToken()
        };
    }

    getMyProfile(username, password){
      let defer = this.$q.defer();

      this.$http({
          method: "GET",
          url: this.USER_SERVICE_BASE_URI + 'me/',
          headers: this.__getHeaders()
      }).then((response) => {
          this.$cookies.put('is_superuser', response.data.is_superuser);
          defer.resolve(response);
      }, (response) => {
          defer.reject(response);
      });

      return defer.promise;
    }

    login(username, password) {
        var url = this.BASE_URI + '/api-token-auth/';

        return this.$http.post(url, {
            username: username,
            password: password
        }).then((response) => {
            if (response.data.token) {
                this.$cookies.put('token', response.data.token);
            }
        });
    }

    logout() {
        this.$cookies.remove('token');
    }

    isLoggedIn() {
        return this.$cookies.get('token') !== '' && this.$cookies.get('token') !== undefined ? true : false;
    }


}

export default AuthenticationService;
