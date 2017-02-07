class EmployeeCreateController {

    constructor(EmployeeService, toastr, $q, $state, $stateParams) {
        'ngInject';

        this.employeeService = EmployeeService;
        this.toastr = toastr;
        this.validation = {};
        this.$state = $state;
        this.$q = $q;

        let employeeId = $stateParams.id;
        this._setLoading();
        this.loadEmployee(employeeId);
    }/*
    loadEmployee(employeeId = null) {
        this._setLoading(true);
        // If there is a primary key, Fetch from database
        if(employeeId) {
            this._fetchEmployee(employeeId)
                // Set Employee and Modal Title
                .then((employee) => {
                    this._setCurrentEmployee(employee);
                    this._setLoading(false);
                },() => {
                    //this._setLoading(false);
                    this.toastr.error('Failed to load Employee');
                    this.$state.go('employee:list');
                });
        }
        // Otherwise create a new instance
        else {
            this._newEmployee()
                .then((response) => {
                    this._setCurrentEmployee(response);
                    this._setLoading(false);
                });
        }
    }
    _fetchEmployee(employeeId) {
        let defer = this.$q.defer();

        this.employeeService.fetch(employeeId)
            .then((response) => {
                defer.resolve(response.data);
            }, () => {
                defer.reject();
            });

        return defer.promise;
    }
    _getCurrentEmployee() {
        return this.employee;
    }

    _setCurrentEmployee(employee) {
        this.employee = employee;
    }

    _newEmployee() {
        let defer = this.$q.defer();

        this.employeeService.getNewEmployeeDefaults()
            .then((response) => {
                defer.resolve(response);
            });

        return defer.promise;
    }

    _fetchEmployee(employeeId) {
        let defer = this.$q.defer();

        this.employeeService.fetch(employeeId)
            .then((response) => {
                defer.resolve(response.data);
            }, () => {
                defer.reject();
            });

        return defer.promise;
    }

    _create(employee) {
        let defer = this.$q.defer();
        this.employeeService.create(employee)
        .then((response) => {
            defer.resolve(response);
        }, (response) => {
            if(response.status === 400) {
                this._setValidation(response.data);
            }
            defer.reject(response);
        });
        return defer.promise;
    }

    _update(employee) {
        let defer = this.$q.defer();
        this.employeeService.update(employee.pk, employee)
        .then((response) => {
            defer.resolve(response);
        }, (response) => {
            if(response.status === 400) {
                this._setValidation(response.data);
            }
            defer.reject(response);
        });
        return defer.promise;
    }
    _setValidation(fieldErrors){
        this.validation = {};
        if( fieldErrors instanceof Array === false) {
            angular.forEach(fieldErrors, (errors, field) => {
                this.validation[field] = [];
                angular.forEach(errors, (validationError) => {
                    this.validation[field].push(validationError);
                });
            });
        }
    }*/

   //_setLoading($value) {
    //    this.loading = $value;
}

export default EmployeeCreateController;
