import EmplyeeCrudController from './employee-crud.controller';

describe('Employee Crud Controller', () => {

    beforeEach(angular.mock.module('app'));

    var $scope;
    var employeeService;
    var toastr;
    var $state;
    var $stateParams;
    var $q;
    var controller;

<<<<<<< HEAD
    beforeEach(angular.mock.inject(( _EmployeeService_, _toastr_, _$state_, _$stateParams_, _$q_, _$rootScope_) => {
=======
    beforeEach(angular.mock.inject((_EmployeeService_, _toastr_, _$state_, _$stateParams_, _$q_, _$rootScope_) => {
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
        $scope = _$rootScope_.$new();
        toastr = _toastr_;
        $state = _$state_;
        $stateParams = _$stateParams_;
        $q = _$q_;
        employeeService = _EmployeeService_;
        controller = createController();
    }));

    function createController(_employeeService = employeeService, _toastr = toastr, _$q = $q, _$state = $state, _$stateParams = $stateParams) {
<<<<<<< HEAD
        let controller = new EmployeeCrudController( _employeeService, _toastr, _$q, _$state, _$stateParams);
=======
        let controller = new EmployeeCrudController(_employeeService, _toastr, _$q, _$state, _$stateParams);
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
        return controller;
    }

    describe('Construct', () => {
        it('sets loading to tre on construct', () => {
            $stateParams.id = 1;
            controller = createController();
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

    describe('save', () => {

        it('sets loading to true before calling http', () => {
<<<<<<< HEAD
            let employee = {title: 'asd'};
=======
            let employee = {
                title: 'asd'
            };
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            controller._setCurrentEmployee(employee);
            controller._setLoading(false);
            expect(controller.loading).toBeFalsy();
            spyOn(controller, '_setLoading');
            controller.save();
            expect(controller._setLoading).toHaveBeenCalledWith(true);
        });

        it('sets loading to false after create promise resolves', () => {
<<<<<<< HEAD
            let employee = {title: 'asd'};
=======
            let employee = {
                title: 'asd'
            };
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            controller._setCurrentEmployee(employee);
            let defer = $q.defer();
            defer.resolve(employee);
            spyOn(controller, '_create').and.returnValue(defer.promise);
            controller.save();
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('sets loading to false after update promise resolves', () => {
<<<<<<< HEAD
            let employee = {pk: 3, title: 'asd'};
=======
            let employee = {
                pk: 3,
                title: 'asd'
            };
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            controller._setCurrentEmployee(employee);
            let defer = $q.defer();
            defer.resolve(employee);
            spyOn(controller, '_update').and.returnValue(defer.promise);
            controller.save();
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('calls _update() when pk is defined', () => {
<<<<<<< HEAD
            let employee = {pk: 3, title: 'title saved'};
=======
            let employee = {
                pk: 3,
                title: 'title saved'
            };
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            let defer = $q.defer();
            defer.resolve(employee);

            spyOn(controller, '_update').and.returnValue(defer.promise);
            spyOn(controller.toastr, 'success');
            spyOn(controller.$state, 'go');

            controller._setCurrentEmployee(employee);
            controller.save();
            $scope.$apply();

            expect(controller.toastr.success).toHaveBeenCalled();
            expect(controller.$state.go).toHaveBeenCalled();
        });

        it('calls _create() when pk is undefined', () => {
<<<<<<< HEAD
            let employee = {title: 'title saved'};
=======
            let employee = {
                title: 'title saved'
            };
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            let defer = $q.defer();
            defer.resolve(employee);

            spyOn(controller, '_create').and.returnValue(defer.promise);
            spyOn(controller.toastr, 'success');
            spyOn(controller.$state, 'go');

            controller._setCurrentEmployee(employee);
            controller.save();
            $scope.$apply();

            expect(controller.toastr.success).toHaveBeenCalled();
            expect(controller.$state.go).toHaveBeenCalled();
        });
    });

    describe('loadEmployee', () => {
        it('sets loading true when called', () => {
            spyOn(controller, '_setLoading');
            controller.loadEmployee();
            expect(controller._setLoading).toHaveBeenCalledWith(true);
        });

        it('sets loading to false once new employee promise resolves', () => {
            let defer = $q.defer();
            defer.resolve({});
            spyOn(controller, '_newEmployee').and.returnValue(defer.promise);
            controller.loadEmployee();
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('sets loading to false once  fetch promise resolves', () => {
            let defer = $q.defer();
            defer.resolve({});
            spyOn(controller, '_fetchEmployee').and.returnValue(defer.promise);
            controller.loadEmployee(1);
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('sets loading to false once  fetch promise rejects', () => {
            let defer = $q.defer();
            defer.reject({});
            spyOn(controller, '_fetchEmployee').and.returnValue(defer.promise);
            controller.loadEmployee(1);
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('should load a new employee with _setCurrentEmployee method', () => {
            let defer = $q.defer();
<<<<<<< HEAD
            defer.resolve({test: 'test'});
=======
            defer.resolve({
                test: 'test'
            });
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            spyOn(controller, '_newEmployee').and.returnValue(defer.promise);
            spyOn(controller, '_setCurrentEmployee');
            controller.loadEmployee();
            $scope.$apply();
            expect(controller._setCurrentEmployee).toHaveBeenCalled();
        });

        it('should call fetch employee when employee id is passed', () => {
            let defer = $q.defer();
            spyOn(controller, '_fetchEmployee').and.returnValue(defer.promise);
            controller.loadEmployee(3);
            expect(controller._fetchEmployee).toHaveBeenCalled();
        });

        it('should set employee if service resolves successfully', () => {
            let defer = $q.defer();
<<<<<<< HEAD
            defer.resolve({title: 'title'});
=======
            defer.resolve({
                title: 'title'
            });
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            spyOn(controller, '_fetchEmployee').and.returnValue(defer.promise);
            spyOn(controller, '_setCurrentEmployee');
            controller.loadEmployee(3);
            $scope.$apply();
            expect(controller._setCurrentEmployee).toHaveBeenCalled();
        });

        it('should error with toastr and change state', () => {
            let defer = $q.defer();
            defer.reject();
            spyOn(controller, '_fetchEmployee').and.returnValue(defer.promise);
            spyOn(controller.toastr, 'error').and.returnValue(false);
            spyOn(controller.$state, 'go').and.returnValue(false);
            controller.loadEmployee(3);
            $scope.$apply();
            expect(controller.toastr.error).toHaveBeenCalled();
            expect(controller.$state.go).toHaveBeenCalled();
        });
    });

    describe('_getCurrentEmployee', () => {
        it('should return the controller employee object', () => {
<<<<<<< HEAD
            let employee = {title: 'current title'};
=======
            let employee = {
                title: 'current title'
            };
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            controller.employee = employee;
            expect(controller._getCurrentEmployee()).toEqual(employee);
        });
    });

    describe('_setCurrentEmployee', () => {
        it('should set the employee on the controller', () => {
<<<<<<< HEAD
            let employee = {'employee': 'should be set'};
=======
            let employee = {
                'employee': 'should be set'
            };
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            expect(controller.employee).not.toEqual(employee);
            controller._setCurrentEmployee(employee);
            expect(controller.employee).toEqual(employee);
        });
    });

    describe('_newEmployee', () => {
        it('should return a promise', () => {
            let defer = $q.defer();
            spyOn(controller.employeeService, 'getNewEmployeeDefaults').and.returnValue(defer.promise);
            let promise = controller._newEmployee();
            expect(promise.constructor.name).toBe('Promise');
        });
    });

    describe('_fetchEmployee', () => {
        it('should return a promise', () => {
            spyOn(controller.employeeService, 'fetch').and.returnValue($q.defer().promise);

            let promise = controller._fetchEmployee(3);

            expect(promise.constructor.name).toBe('Promise');
        });

        it('should call service fetch method', () => {
            spyOn(controller.employeeService, 'fetch').and.returnValue($q.defer().promise);

            let promise = controller._fetchEmployee(3);

            expect(controller.employeeService.fetch).toHaveBeenCalled();
        });

        it('should return service data when resolves', () => {
            let fetchPromise = $q.defer();
<<<<<<< HEAD
            let employee = {title: 'fetched title'};
            fetchPromise.resolve({data: employee});
=======
            let employee = {
                title: 'fetched title'
            };
            fetchPromise.resolve({
                data: employee
            });
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0

            spyOn(controller.employeeService, 'fetch').and.returnValue(fetchPromise.promise);
            let controllerReturn = controller._fetchEmployee(3);

            expect(controllerReturn.constructor.name).toBe("Promise");
            controllerReturn.then((returnValue) => {
                expect(returnValue).toBe(employee);
            }, () => {
                fail();
            });

            $scope.$apply();
        });

        it('should reject when service fails', (done, fail) => {
            let fetchPromise = $q.defer();
            fetchPromise.reject();

            spyOn(controller.employeeService, 'fetch').and.returnValue(fetchPromise.promise);
            let controllerReturn = controller._fetchEmployee(3);

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
<<<<<<< HEAD
            let defer = controller._create({title: 'title'});
=======
            let defer = controller._create({
                title: 'title'
            });
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            expect(defer.constructor.name).toBe("Promise");
        });

        it('should call employee service create', () => {
            let serviceDeferred = $q.defer();
            spyOn(controller.employeeService, 'create').and.returnValue(serviceDeferred.promise);

<<<<<<< HEAD
            serviceDeferred.resolve({pk: '1', title: 'title'});
            controller._create({title: 'tester'});
=======
            serviceDeferred.resolve({
                pk: '1',
                title: 'title'
            });
            controller._create({
                title: 'tester'
            });
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0

            expect(controller.employeeService.create).toHaveBeenCalled();
        });

        it('should resolve once employee service create resolves', () => {
<<<<<<< HEAD
            let serviceReturn = {pk: 2, title: 'title from service'};
            let createDeferred = $q.defer();
            spyOn(controller.employeeService, 'create').and.returnValue(createDeferred.promise);

            createDeferred.resolve(serviceReturn);
            let promise = controller._create({title: 'title to controller'});

            expect(promise.constructor.name).toBe('Promise');
            promise.then((returnValue) => {
               expect(returnValue).toEqual(serviceReturn);
=======
            let serviceReturn = {
                pk: 2,
                title: 'title from service'
            };
            let createDeferred = $q.defer();
            spyOn(controller.employeeService, 'create').and.returnValue(createDeferred.promise);

            createDeferred.resolve(serviceReturn);
            let promise = controller._create({
                title: 'title to controller'
            });

            expect(promise.constructor.name).toBe('Promise');
            promise.then((returnValue) => {
                expect(returnValue).toEqual(serviceReturn);
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            });
            $scope.$apply();

        });

        it('should set validation when service create rejects', () => {
<<<<<<< HEAD
            let serviceReturn = {status: 400, data: {title: 'title is required'}};
=======
            let serviceReturn = {
                status: 400,
                data: {
                    title: 'title is required'
                }
            };
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            let createDeferred = $q.defer();
            spyOn(controller.employeeService, 'create').and.returnValue(createDeferred.promise);
            spyOn(controller, '_setValidation');

            createDeferred.reject(serviceReturn);
<<<<<<< HEAD
            let promise = controller._create({title: 'title to controller'});

            expect(promise.constructor.name).toBe('Promise');
            promise.then((returnValue) => {
               expect(returnValue).toEqual(serviceReturn);
               expect(controller._setValidation).toHaveBeenCalled();
=======
            let promise = controller._create({
                title: 'title to controller'
            });

            expect(promise.constructor.name).toBe('Promise');
            promise.then((returnValue) => {
                expect(returnValue).toEqual(serviceReturn);
                expect(controller._setValidation).toHaveBeenCalled();
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            });

            $scope.$apply();
        });
    });

    describe('_update', () => {

        it('should return a promise', () => {
<<<<<<< HEAD
            let defer = controller._update({pk: 1, title: 'test title'});
=======
            let defer = controller._update({
                pk: 1,
                title: 'test title'
            });
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            expect(defer.constructor.name).toBe("Promise");
        });

        it('should call employee service update', () => {
            let defer = $q.defer();
            let updateDeferred = $q.defer();
<<<<<<< HEAD
            updateDeferred.resolve({pk: '1', title: 'title'});
            spyOn(controller.employeeService, 'update').and.returnValue(updateDeferred.promise);
            controller._update({pk: 2, title: 'tester'});
=======
            updateDeferred.resolve({
                pk: '1',
                title: 'title'
            });
            spyOn(controller.employeeService, 'update').and.returnValue(updateDeferred.promise);
            controller._update({
                pk: 2,
                title: 'tester'
            });
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            expect(controller.employeeService.update).toHaveBeenCalled();
        });

        it('should resolve once employee service update resolves', () => {
<<<<<<< HEAD
            let serviceReturn = {pk: 2, title: 'title from service'};
=======
            let serviceReturn = {
                pk: 2,
                title: 'title from service'
            };
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            let updateDeferred = $q.defer();
            updateDeferred.resolve(serviceReturn);
            spyOn(controller.employeeService, 'update').and.returnValue(updateDeferred.promise);

<<<<<<< HEAD
            let promise = controller._update({pk: 2, title: 'title to controller'});
            expect(promise.constructor.name).toBe('Promise');
            promise.then((returnValue) => {
               expect(returnValue).toEqual(serviceReturn);
=======
            let promise = controller._update({
                pk: 2,
                title: 'title to controller'
            });
            expect(promise.constructor.name).toBe('Promise');
            promise.then((returnValue) => {
                expect(returnValue).toEqual(serviceReturn);
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            });
            $scope.$apply();

        });

        it('should set validation when service rejects', () => {
            let defer = $q.defer();
<<<<<<< HEAD
            let serviceReturn = {status: 400, data: {title: 'title is required'}};
=======
            let serviceReturn = {
                status: 400,
                data: {
                    title: 'title is required'
                }
            };
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
            let updateDeferred = $q.defer();
            updateDeferred.reject(serviceReturn);
            spyOn(controller.employeeService, 'update').and.returnValue(updateDeferred.promise);
            spyOn(controller, '_setValidation');

<<<<<<< HEAD
            let promise = controller._update({pk: 2, title: 'title to controller'});
            expect(promise.constructor.name).toBe('Promise');
            promise.then((returnValue) => {
               expect(returnValue).toEqual(serviceReturn);
=======
            let promise = controller._update({
                pk: 2,
                title: 'title to controller'
            });
            expect(promise.constructor.name).toBe('Promise');
            promise.then((returnValue) => {
                expect(returnValue).toEqual(serviceReturn);
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0
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
<<<<<<< HEAD
    });
=======
    });
>>>>>>> c4a54b8c763cc0927669beffe2df7ca7eea176a0

    describe('_setLoading', () => {
        it('should change loading value', () => {
            controller._setLoading(true);
            expect(controller.loading).toBeTruthy();
            controller._setLoading(false);
            expect(controller.loading).toBeFalsy();
            controller._setLoading(true);
            expect(controller.loading).toBeTruthy();
        });
    });
});
