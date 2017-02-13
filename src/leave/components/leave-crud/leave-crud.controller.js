class LeaveCreateController {

    constructor(LeaveService, toastr, $q, $state, $stateParams) {
        'ngInject';

        this.leaveService = LeaveService;
        this.toastr = toastr;
        this.validation = {};
        this.$state = $state;
        this.$q = $q;

        let leaveId = $stateParams.id;
        this._setLoading(true);
        this.loadLeave(leaveId);
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

    save() {
        this._setLoading(true);
        // Create a clone of the current leave as to not mess with user input
        let leave = angular.copy(this._getCurrentLeave());

        if(typeof leave.pk === 'undefined') {
            this._create(leave)
                .then(() => {
                    this._setLoading(false);
                    this.toastr.success('Leave Created');
                    this.$state.go('leave:list');
                });
        } else {
            this._update(leave)
                .then(() => {
                    this._setLoading(false);
                    this.toastr.success('Leave Updated');
                    this.$state.go('leave:list');
                });
        }
    }

    loadLeave(leaveId = null) {
        this._setLoading(true);
        // If there is a primary key, Fetch from database
        if(leaveId) {
            this._fetchLeave(leaveId)
                // Set Leave and Modal Title
                .then((leave) => {
                    this._setCurrentLeave(leave);
                    this._setLoading(false);
                },() => {
                    this._setLoading(false);
                    this.toastr.error('Failed to load Leave');
                    this.$state.go('leave:list');
                });
        }
        // Otherwise create a new instance
        else {
            this._newLeave()
                .then((response) => {
                    this._setCurrentLeave(response);
                    this._setLoading(false);
                });
        }
    }

    _getCurrentLeave() {
        return this.leave;
    }

    _setCurrentLeave(leave) {
        this.leave = leave;
    }

    _newLeave() {
        let defer = this.$q.defer();

        this.leaveService.getNewLeaveDefaults()
            .then((response) => {
                defer.resolve(response);
            });

        return defer.promise;
    }

    _fetchLeave(leaveId) {
        let defer = this.$q.defer();

        this.leaveService.fetch(leaveId)
            .then((response) => {
                defer.resolve(response.data);
            }, () => {
                defer.reject();
            });

        return defer.promise;
    }

    _create(leave) {
        let defer = this.$q.defer();
        this.leaveService.create(leave)
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

    _update(leave) {
        let defer = this.$q.defer();
        this.leaveService.update(leave.pk, leave)
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

    _setLoading($value) {
        this.loading = $value;
    }

}

export default LeaveCreateController;
