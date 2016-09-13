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
}

export default ProjectService;