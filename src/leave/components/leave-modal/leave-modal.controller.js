class LeaveModalController {

    constructor($uibModalInstance, leaveId, $q, refreshGrid, LeaveService, toastr) {
        'ngInject';

        // The modal instance opened from Leave List
        this.modal = $uibModalInstance;
        this.toastr = toastr;
        this.leaveService = LeaveService;

        // refreshGrid -> LeaveListController.get()
        this.refreshGrid = refreshGrid;
        this.$q = $q;
        this._setLoading(true);

        // Load the leave referenced into local variables
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

    cancel() {
        this.modal.dismiss('cancel');
    }

    save() {
        this._setLoading(true);
        // Create a clone of current leave as to not mess with user input.
        let leave = angular.copy(this._getCurrentLeave());

        if(typeof leave.pk === 'undefined') {
            this._create(leave)
                .then(() => {
                    this.toastr.success('Leave Created');
                    this.modal.close();
                    this.refreshGrid();
                    this._setLoading(false);
                });
        } else {
            this._update(leave)
                .then(() => {
                    this.toastr.success('Leave Updated');
                    this.modal.close();
                    this.refreshGrid();
                    this._setLoading(false);
                });
        }
    }

    loadLeave(leaveId = null) {
        this._setLoading(true);
        // If there is a primary key, Fetch from database
        if(leaveId) {
            // Set Preliminary Modal Title
            this._setModalTitle('Update Leave : ...');

            this._fetchLeave(leaveId)
                // Set Leave and Modal Title
                .then((leave) => {
                    this._setModalTitle(`Update Leave : ${leave.title}`);
                    this._setCurrentLeave(leave);
                    this._setLoading(false);
                },() => {
                    this.toastr.error('We where unable to load this leave at the current time');
                    this.modal.dismiss('error');
                    this._setLoading(false);
                });
        }
        // Otherwise create a new instance
        else {
            this._setModalTitle('New Leave ...');
            this._newLeave()
                .then((response) => {
                    this._setCurrentLeave(response);
                    this._setLoading(false);
                });
        }
    }

    _getCurrentLeave(leave) {
        return this.leave;
    }

    _setCurrentLeave(leave) {
        this.leave = leave;
    }

    _setModalTitle(title) {
        this.modalTitle = title;
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
                let leave = response.data;
                defer.resolve(leave);
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

export default LeaveModalController;
