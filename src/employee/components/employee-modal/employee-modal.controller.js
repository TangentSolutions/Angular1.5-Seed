class EmployeeModalController {

    constructor($uibModalInstance, employeeId, $q, refreshGrid, EmployeeService, toastr) {
        'ngInject';

        // The modal instance opened from Employee List
        this.modal = $uibModalInstance;
        this.toastr = toastr;
        this.employeeService = EmployeeService;

        // refreshGrid -> EmployeeListController.get()
        this.refreshGrid = refreshGrid;
        this.$q = $q;
        this._setLoading(true);

        // Load the employee referenced into local variables
        this.loadEmployee(employeeId);
    }

    datePickers = {
        startDate: {
            opened: false,
            open: () => {
                this.datePickers.startDate.opened = true;
            }
        },
        endDate: {
            opened: false,
            open: () => {
                this.datePickers.endDate.opened = true;
            }
        }
    }

    cancel() {
        this.modal.dismiss('cancel');
    }

    save() {
        this._setLoading(true);
        // Create a clone of current employee as to not mess with user input.
        let employee = angular.copy(this._getCurrentEmployee());

        if(typeof employee.pk === 'undefined') {
            this._create(employee)
                .then(() => {
                    this.toastr.success('Employee Created');
                    this.modal.close();
                    this.refreshGrid();
                    this._setLoading(false);
                });
        } else {
            this._update(employee)
                .then(() => {
                    this.toastr.success('Employee Updated');
                    this.modal.close();
                    this.refreshGrid();
                    this._setLoading(false);
                });
        }
    }

    loadEmployee(employeeId = null) {
        this._setLoading(true);
        // If there is a primary key, Fetch from database
        if(employeeId) {
            // Set Preliminary Modal Title
            this._setModalTitle('Update Employee : ...');

            this._fetchEmployee(employeeId)
                // Set Employee and Modal Title
                .then((employee) => {
                    this._setModalTitle(`Update Employee : ${employee.title}`);
                    this._setCurrentEmployee(employee);
                    this._setLoading(false);
                },() => {
                    this.toastr.error('We where unable to load this employee at the current time');
                    this.modal.dismiss('error');
                    this._setLoading(false);
                });
        }
        // Otherwise create a new instance
        else {
            this._setModalTitle('New Employee ...');
            this._newEmployee()
                .then((response) => {
                    this._setCurrentEmployee(response);
                    this._setLoading(false);
                });
        }
    }

    _getCurrentEmployee(employee) {
        return this.employee;
    }

    _setCurrentEmployee(employee) {
        this.employee = employee;
    }

    _setModalTitle(title) {
        this.modalTitle = title;
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
                let employee = response.data;
                defer.resolve(employee);
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

    _setLoading($value) {
        this.loading = $value;
    }

    _setValidation(fieldErrors) {
        this.validation = {};
        if( fieldErrors instanceof Array === false) {
            angular.forEach(fieldErrors, (errors, field) => {
                this.validation[field] = [];
                angular.forEach(errors, (validationError) => {
                    this.validation[field].push(validationError);
                });
            });
        }
    }
}

export default EmployeeModalController;
