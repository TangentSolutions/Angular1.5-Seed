class ProjectService {
    constructor($http, $log, PROJECT_SERVICE_BASE_URI, $q, $cookies) {
        'ngInject';

        this.$http = $http;
        this.BASE_URI = PROJECT_SERVICE_BASE_URI + 'projects/';
        this.$q = $q;
        this.$cookies = $cookies;
    }

    get() {
        var deferred = this.$q.defer();
        var token = this.$cookies.get('token');
        this.$http({
            method: "GET",
            url: this.BASE_URI,
            headers: {
                Authorization: 'Token ' + token
            }
        }).then((response) => {
            deferred.resolve(response);
        }, (response) => {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    fetch(id) {
        var deferred = this.$q.defer();
        var token = this.$cookies.get('token');
        this.$http({
            method: "GET",
            url: this.BASE_URI + id + '/',
            headers: {
                Authorization: 'Token ' + token
            }
        }).then((response) => {
            deferred.resolve(response);
        }, (response) => {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    update(id, attributes) {
        var deferred = this.$q.defer();
        var token = this.$cookies.get('token');
        this.$http({
            method: "PUT",
            url: this.BASE_URI + id + '/',
            headers: {
                Authorization: 'Token ' + token
            },
            data: attributes
        }).then((response) => {
            deferred.resolve(response);
        }, (response) => {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    create(attributes) {
        var deferred = this.$q.defer();
        var token = this.$cookies.get('token');
        this.$http({
            method: "POST",
            url: this.BASE_URI,
            headers: {
                Authorization: 'Token ' + token
            },
            data: attributes
        }).then((response) => {
            deferred.resolve(response);
        }, (response) => {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    delete(id) {
        var deferred = this.$q.defer();
        var token = this.$cookies.get('token');
        this.$http({
            method: "DELETE",
            url: this.BASE_URI + id + '/',
            headers: {
                Authorization: 'Token ' + token
            }
        }).then((response) => {
            deferred.resolve(response);
        }, (response) => {
            deferred.reject(response);
        });
        return deferred.promise;
    }
}

export default ProjectService;