class ProjectService {
    constructor($http, $log, PROJECT_SERVICE_BASE_URI, $q, $cookies) {
        'ngInject';

        this.$http = $http;
        this.BASE_URI = PROJECT_SERVICE_BASE_URI + 'projects/';
        this.$q = $q;
        this.$cookies = $cookies;
        this.$log = $log;
    }

    get() {
        var deferred = this.$q.defer();
        var url = this.BASE_URI;
        var token = this.$cookies.get('token');

        this.$http({
            method: "GET",
            url: url,
            headers: {
                Authorization: 'Token ' + token
            }
        }).then((response) => {
            this.$log.debug(response);
            deferred.resolve(response);
        }, (response) => {
            this.$log.error("error from http");
            this.$log.debug(response);
            deferred.reject(response);
        });

        return deferred.promise;
    }
}

export default ProjectService;