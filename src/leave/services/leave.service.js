class LeaveService {
    constructor($http, $q, $cookies, $filter, $timeout, LEAVE_SERVICE_BASE_URI) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.$cookies = $cookies;
        this.$filter = $filter;
        this.$timeout = $timeout;

        this.BASE_URI = LEAVE_SERVICE_BASE_URI;

        // Dates that need to be converted for API
        this.apiDates = [
            'start_date',
            'end_date'
        ];

        // Format that API accepts
        this.apiDateFormat = 'yyyy-MM-dd';
    }

    __getHeaders() {
        return {
            Authorization: 'Token ' + this._getAuthToken()
        };
    }

    /**
     * Return A defaults object in a promise.
     * This will help if we want to use the web service to get these defaults
     */
    getNewLeaveDefaults() {

        let defer = this.$q.defer();

        let leave = {
            is_active:true,
            is_billable: true
        };

        defer.resolve(leave);


        return defer.promise;
    }

    get(query = undefined) {
        let defer = this.$q.defer();

        this.$http({
            method: "GET",
            url: this.BASE_URI,
            headers: this.__getHeaders(),
            params: query
        }).then((response) => {
            defer.resolve(response);
        }, (response) => {
            defer.reject(response);
        });

        return defer.promise;
    }

    isSuperUser(){
        return this.$cookies.get('is_superuser') === 'true';
    }

    fetch(id) {
        let defer = this.$q.defer();

        this.$http({
            method: "GET",
            url: this.BASE_URI + id + '/',
            headers: this.__getHeaders()
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
            headers: this.__getHeaders(),
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
            headers: this.__getHeaders(),
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
            headers: this.__getHeaders()
        }).then((response) => {
            defer.resolve(response);
        }, (response) => {
            defer.reject(response);
        });

        return defer.promise;
    }

    _dateStringsToObjects(object) {
        if(typeof object !== 'undefined'){
            angular.forEach(this.apiDates, (dateProperty) => {
                if(typeof object[dateProperty] === 'string' && object[dateProperty].trim()) {
                    object[dateProperty] = new Date(object[dateProperty]);
                }
            });
        }
        return object;
    }

    _dateObjectsToStrings(object) {
        if(typeof object !== 'undefined'){
            angular.forEach(this.apiDates, (dateProperty) => {
                if(typeof object[dateProperty] === 'object' && object[dateProperty].constructor.name === 'Date') {
                    object[dateProperty] = this.$filter('date')(object[dateProperty], this.apiDateFormat);
                }
            });
        }
        return object;
    }

    _getAuthToken() {
        return this.$cookies.get('token');
    }
}

export default LeaveService;
