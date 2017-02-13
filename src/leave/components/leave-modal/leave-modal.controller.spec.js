import LeaveModalController from './leave-modal.controller';

describe('Leave Crud Controller', () => {

    beforeEach(angular.mock.module('app'));

    var $uibModalInstance, leaveId, $q, refreshGrid, leaveService, toastr, controller, $scope;


    beforeEach(angular.mock.inject(( _$q_, _LeaveService_, _toastr_, _$rootScope_) => {
        $uibModalInstance = {
            close: () => {},
            dismiss: (reason) => {}
        };
        leaveId = null;
        $q = _$q_;
        leaveService = _LeaveService_;
        toastr = _toastr_;
        $scope = _$rootScope_.$new();
        refreshGrid = () => {};
        controller = createController();
    }));

    function createController(_$uibModalInstance = $uibModalInstance, _leaveId = leaveId, _$q = $q, _refreshGrid = refreshGrid, _leaveService = leaveService, _toastr = toastr) {
        let controller = new LeaveModalController(_$uibModalInstance, _leaveId, _$q, _refreshGrid, _leaveService, _toastr);
        return controller;
    }

    describe('Constructor', () => {
        it('sets loading to true when constructed with leaveId', () => {
            let controller = createController();
            expect(controller.loading).toBeTruthy();
        });
    });

    describe('Date Picker Objects', () => {
        it('should have date pickers defined', () => {
            expect(controller.datePickers).toBeDefined();
        });

        describe('Single Date Picker Object', () => {
            it('should have an "opened" property', () => {
                angular.forEach(controller.datePickers, (picker) => {
                    expect(picker.opened).toBeDefined();
                });
            });

            it('should have an boolean opened property', () => {
                angular.forEach(controller.datePickers, (picker) => {
                    expect(typeof picker.opened).toBe('boolean');
                });
            });

            it('should have an open method defined', () => {
                angular.forEach(controller.datePickers, (picker) => {
                    expect(picker.open).toBeDefined();
                });
            });

            it('should have an open method that reverses the opened property', () => {
                angular.forEach(controller.datePickers, (picker, key) => {
                    expect(controller.datePickers[key].opened).toBeFalsy();
                    controller.datePickers[key].open();
                    expect(controller.datePickers[key].opened).toBeTruthy();
                });
            });
        });
    });

    describe('cancel()', () => {
        it('should call dismiss() on modal instance', () => {
            spyOn(controller.modal, 'dismiss');
            controller.cancel();
            expect(controller.modal.dismiss).toHaveBeenCalled();
        });
    });

    describe('save', () => {
        it('sets loading to true before calling http', () => {

            let leave = {title: 'asd'};
            controller._setCurrentLeave(leave);
            controller._setLoading(false);
            expect(controller.loading).toBeFalsy();
            spyOn(controller, '_setLoading');
            controller.save();
            expect(controller._setLoading).toHaveBeenCalledWith(true);
        });

        it('sets loading to false after create promise resolves', () => {
            let leave = {title: 'asd'};
            controller._setCurrentLeave(leave);
            let defer = $q.defer();
            defer.resolve(leave);
            spyOn(controller, '_create').and.returnValue(defer.promise);
            controller.save();
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('sets loading to false after update promise resolves', () => {

            let leave = {pk: 3, title: 'asd'};
            controller._setCurrentLeave(leave);
            let defer = $q.defer();
            defer.resolve(leave);
            spyOn(controller, '_update').and.returnValue(defer.promise);
            controller.save();
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('calls _update() when pk is defined', () => {

            let leave = {pk: 3, title: 'title saved'};
            let defer = $q.defer();
            defer.resolve(leave);

            spyOn(controller, '_update').and.returnValue(defer.promise);
            spyOn(controller.toastr, 'success');
            spyOn(controller.modal, 'close');
            spyOn(controller, 'refreshGrid');

            controller._setCurrentLeave(leave);
            controller.save();
            $scope.$apply();

            expect(controller.toastr.success).toHaveBeenCalled();
            expect(controller.modal.close).toHaveBeenCalled();
            expect(controller.refreshGrid).toHaveBeenCalled();
        });

        it('calls _create() when pk is undefined', () => {

            let leave = {title: 'title saved'};
            let defer = $q.defer();
            defer.resolve(leave);

            spyOn(controller, '_create').and.returnValue(defer.promise);
            spyOn(controller.toastr, 'success');
            spyOn(controller.modal, 'close');
            spyOn(controller, 'refreshGrid');

            controller._setCurrentLeave(leave);
            controller.save();
            $scope.$apply();

            expect(controller.toastr.success).toHaveBeenCalled();
            expect(controller.modal.close).toHaveBeenCalled();
            expect(controller.refreshGrid).toHaveBeenCalled();
        });
    });

    describe('loadLeave', () => {
        it('sets loading true when called', () => {
            spyOn(controller, '_setLoading');
            controller.loadLeave();
            expect(controller._setLoading).toHaveBeenCalledWith(true);
        });

        it('sets loading to false once new leave promise resolves', () => {
            let defer = $q.defer();
            defer.resolve({});
            spyOn(controller, '_newLeave').and.returnValue(defer.promise);
            controller.loadLeave();
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('sets loading to false once  fetch promise resolves', () => {
            let defer = $q.defer();
            defer.resolve({});
            spyOn(controller, '_fetchLeave').and.returnValue(defer.promise);
            controller.loadLeave(1);
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('sets loading to false once  fetch promise rejects', () => {
            let defer = $q.defer();
            defer.reject({});
            spyOn(controller, '_fetchLeave').and.returnValue(defer.promise);
            controller.loadLeave(1);
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('should load a new leave with _setCurrentLeave method', () => {
            let defer = $q.defer();

            defer.resolve({test: 'test'});
            spyOn(controller, '_newLeave').and.returnValue(defer.promise);
            spyOn(controller, '_setCurrentLeave');
            controller.loadLeave();
            $scope.$apply();
            expect(controller._setCurrentLeave).toHaveBeenCalled();
        });

        it('should call fetch leave when leave id is passed', () => {
            let defer = $q.defer();
            spyOn(controller, '_fetchLeave').and.returnValue(defer.promise);
            controller.loadLeave(3);
            expect(controller._fetchLeave).toHaveBeenCalled();
        });

        it('should set leave if service resolves successfully', () => {
            let defer = $q.defer();

            defer.resolve({title: 'title'});
            spyOn(controller, '_fetchLeave').and.returnValue(defer.promise);
            spyOn(controller, '_setCurrentLeave');
            spyOn(controller, '_setModalTitle');
            controller.loadLeave(3);
            $scope.$apply();
            expect(controller._setCurrentLeave).toHaveBeenCalled();
            expect(controller._setModalTitle).toHaveBeenCalled();
        });

        it('should error with toastr and change state', () => {
            let defer = $q.defer();
            defer.reject();
            spyOn(controller, '_fetchLeave').and.returnValue(defer.promise);
            spyOn(controller.toastr, 'error').and.returnValue(false);
            spyOn(controller.modal, 'dismiss').and.returnValue(false);
            controller.loadLeave(3);
            $scope.$apply();
            expect(controller.toastr.error).toHaveBeenCalled();
            expect(controller.modal.dismiss).toHaveBeenCalled();
        });
    });

    describe('_getCurrentLeave', () => {
        it('should return the controller leave object', () => {
            let leave = {title: 'current title'};
            controller.leave = leave;
            expect(controller._getCurrentLeave()).toEqual(leave);
        });
    });

    describe('_setCurrentLeave', () => {
        it('should set the leave on the controller', () => {
            let leave = {'leave': 'should be set'};
            expect(controller.leave).not.toEqual(leave);
            controller._setCurrentLeave(leave);
            expect(controller.leave).toEqual(leave);
        });
    });

    describe('_newLeave', () => {
        it('should return a default object', () => {
            let leave = controller._newLeave();
            expect(typeof leave).toBe('object');
        });
    });

    describe('_fetchLeave', () => {
        it('should return a promise', () => {
            spyOn(controller.leaveService, 'fetch').and.returnValue($q.defer().promise);

            let promise = controller._fetchLeave(3);

            expect(promise.constructor.name).toBe('Promise');
        });

        it('should call service fetch method', () => {
            spyOn(controller.leaveService, 'fetch').and.returnValue($q.defer().promise);

            let promise = controller._fetchLeave(3);

            expect(controller.leaveService.fetch).toHaveBeenCalled();
        });

        it('should return service data when resolves', () => {
            let fetchPromise = $q.defer();
            let leave = {title: 'fetched title'};
            fetchPromise.resolve({data: leave});

            spyOn(controller.leaveService, 'fetch').and.returnValue(fetchPromise.promise);
            let controllerReturn = controller._fetchLeave(3);

            expect(controllerReturn.constructor.name).toBe("Promise");
            controllerReturn.then((returnValue) => {
                expect(returnValue).toBe(leave);
            }, () => {
                fail();
            });

            $scope.$apply();
        });

        it('should reject when service fails', (done, fail) => {
            let fetchPromise = $q.defer();
            fetchPromise.reject();

            spyOn(controller.leaveService, 'fetch').and.returnValue(fetchPromise.promise);
            let controllerReturn = controller._fetchLeave(3);

            expect(controllerReturn.constructor.name).toBe("Promise");
            controllerReturn.then((returnValue) => {
                fail();
            }, () => {
                done();
            });

            $scope.$apply();
        });
    });

    describe('_create', () => {
        it('should return a promise', () => {
            let defer = controller._create({title: 'title'});
            expect(defer.constructor.name).toBe("Promise");
        });

        it('should call leave service create', () => {
            let serviceDeferred = $q.defer();
            spyOn(controller.leaveService, 'create').and.returnValue(serviceDeferred.promise);

            serviceDeferred.resolve({pk: '1', title: 'title'});
            controller._create({title: 'tester'});

            expect(controller.leaveService.create).toHaveBeenCalled();
        });

        it('should resolve once leave service create resolves', () => {
            let serviceReturn = {pk: 2, title: 'title from service'};
            let createDeferred = $q.defer();
            spyOn(controller.leaveService, 'create').and.returnValue(createDeferred.promise);

            createDeferred.resolve(serviceReturn);
            let promise = controller._create({title: 'title to controller'});

            expect(promise.constructor.name).toBe('Promise');
            promise.then((returnValue) => {
               expect(returnValue).toEqual(serviceReturn);
            });
            $scope.$apply();

        });

        it('should set validation when service create rejects', () => {
            let serviceReturn = {status: 400, data: {title: 'title is required'}};
            let createDeferred = $q.defer();
            spyOn(controller.leaveService, 'create').and.returnValue(createDeferred.promise);
            spyOn(controller, '_setValidation');

            createDeferred.reject(serviceReturn);

            let promise = controller._create({title: 'title to controller'});

            expect(promise.constructor.name).toBe('Promise');
            promise.then((returnValue) => {
               expect(returnValue).toEqual(serviceReturn);
               expect(controller._setValidation).toHaveBeenCalled();
            });

            $scope.$apply();
        });
    });

    describe('_update', () => {

        it('should return a promise', () => {
            let defer = controller._update({pk: 1, title: 'test title'});
            expect(defer.constructor.name).toBe("Promise");
        });

        it('should call leave service update', () => {
            let defer = $q.defer();
            let updateDeferred = $q.defer();
            updateDeferred.resolve({pk: '1', title: 'title'});
            spyOn(controller.leaveService, 'update').and.returnValue(updateDeferred.promise);
            controller._update({pk: 2, title: 'tester'});
            expect(controller.leaveService.update).toHaveBeenCalled();
        });

        it('should resolve once leave service update resolves', () => {
            let serviceReturn = {pk: 2, title: 'title from service'};
            let updateDeferred = $q.defer();
            updateDeferred.resolve(serviceReturn);
            spyOn(controller.leaveService, 'update').and.returnValue(updateDeferred.promise);


            let promise = controller._update({pk: 2, title: 'title to controller'});
            expect(promise.constructor.name).toBe('Promise');
            promise.then((returnValue) => {
               expect(returnValue).toEqual(serviceReturn);
            });
            $scope.$apply();

        });

        it('should set validation when service rejects', () => {
            let defer = $q.defer();
            let serviceReturn = {status: 400, data: {title: 'title is required'}};
            let updateDeferred = $q.defer();
            updateDeferred.reject(serviceReturn);
            spyOn(controller.leaveService, 'update').and.returnValue(updateDeferred.promise);
            spyOn(controller, '_setValidation');

            let promise = controller._update({pk: 2, title: 'title to controller'});
            expect(promise.constructor.name).toBe('Promise');
            promise.then((returnValue) => {
               expect(returnValue).toEqual(serviceReturn);
            });
            $scope.$apply();
            expect(controller._setValidation).toHaveBeenCalled();

        });
    });

    describe('_setValidation', () => {
        it('sets validation object with valid input', () => {
            let validationMock = {
                tite: [
                    'title is required',
                    'title needs to be shorter than 255 characters'
                ],
                description: [
                    'description is required'
                ]
            };

            controller._setValidation(validationMock);
            expect(controller.validation).toEqual(validationMock);
        });

        it('sets an empty object if no validation is passed', () => {
            controller._setValidation({});

            expect(controller.validation).toEqual({});
        });

        it('silently set an empty objects when invalid syntax is passed', () => {
            controller._setValidation(['invalid text']);

            expect(controller.validation).toEqual({});
        });
    });

    describe('_setLoading', () => {
        it('sets loading variable to passed variable', () => {
            controller._setLoading(true);
            expect(controller.loading).toBeTruthy();
            controller._setLoading(false);
            expect(controller.loading).toBeFalsy();
            controller._setLoading(true);
            expect(controller.loading).toBeTruthy();
        });
    });

});
