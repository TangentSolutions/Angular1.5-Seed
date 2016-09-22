class ProjectService {
    constructor($http, $log, PROJECT_SERVICE_BASE_URI, $q, $cookies, $filter) {
        'ngInject';

        this.$http = $http;
        this.BASE_URI = PROJECT_SERVICE_BASE_URI + 'projects/';
        this.$q = $q;
        this.$cookies = $cookies;
        this.$filter = $filter;

        // Dates that need to be converted for API
        this.apiDates = [
            'start_date',
            'end_date'
        ];

        // Format that API accepts
        this.apiDateFormat = 'yyyy-MM-dd';
    }

    get() {
        let defer = this.$q.defer();
        
        this.$http({
            method: "GET",
            url: this.BASE_URI,
            headers: {
                Authorization: 'Token ' + this._getAuthToken()
            }
        }).then((response) => {
            let responseClone = angular.copy(response);
            angular.forEach(responseClone.data, (project, key) => {
                responseClone[key] = this._dateStringsToObjects(project);
            });
            defer.resolve(responseClone);
        }, (response) => {
            defer.reject(response);
        });

        return defer.promise;
    }

    fetch(id) {
        let defer = this.$q.defer();

        this.$http({
            method: "GET",
            url: this.BASE_URI + id + '/',
            headers: {
                Authorization: 'Token ' + this._getAuthToken()
            }
        }).then((response) => {
            let responseClone = angular.copy(response);
            responseClone.data = this._dateStringsToObjects(response.data);
            defer.resolve(responseClone);
        }, (response) => {
            defer.reject(response);
        });

        return defer.promise;
    }

    update(id, attributes) {
        let defer = this.$q.defer();
        let formattedAttributes = this._dateObjectsToStrings(attributes);

        this.$http({
            method: "PUT",
            url: this.BASE_URI + id + '/',
            headers: {
                Authorization: 'Token ' + this._getAuthToken()
            },
            data: formattedAttributes
        }).then((response) => {
            let responseClone = angular.copy(response);
            responseClone.data = this._dateStringsToObjects(response.data);
            defer.resolve(responseClone);
        }, (response) => {
            defer.reject(response);
        });

        return defer.promise;
    }

    create(attributes) {
        let defer = this.$q.defer();
        let formattedAttributes = this._dateObjectsToStrings(attributes);

        this.$http({
            method: "POST",
            url: this.BASE_URI,
            headers: {
                Authorization: 'Token ' + this._getAuthToken()
            },
            data: formattedAttributes
        }).then((response) => {
            let responseClone = angular.copy(response);
            responseClone.data = this._dateStringsToObjects(response.data);
            defer.resolve(responseClone);
        }, (response) => {
            defer.reject(response);
        });

        return defer.promise;
    }

    delete(id) {
        let defer = this.$q.defer();

        this.$http({
            method: "DELETE",
            url: this.BASE_URI + id + '/',
            headers: {
                Authorization: 'Token ' + this._getAuthToken()
            }
        }).then((response) => {
            defer.resolve(response);
        }, (response) => {
            defer.reject(response);
        });

        return defer.promise;
    }

    _dateStringsToObjects(object) {
        angular.forEach(this.apiDates, (dateProperty) => {
            if(typeof object[dateProperty] === 'string' && object[dateProperty].trim()) {
                object[dateProperty] = new Date(object[dateProperty]);
            }
        });
        return object;
    }

    _dateObjectsToStrings(object) {
        angular.forEach(this.apiDates, (dateProperty) => {
            if(typeof object[dateProperty] === 'object' && object[dateProperty].constructor.name === 'Date') {
                object[dateProperty] = this.$filter('date')(object[dateProperty], this.apiDateFormat);
            }
        });
        return object;
    }

    _getAuthToken() {
        return this.$cookies.get('token');
    }
}

export default ProjectService;