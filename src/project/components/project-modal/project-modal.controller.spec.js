import ProjectModalController from './project-modal.controller';

describe('Project Crud Controller', () => {

    beforeEach(angular.mock.module('app'));

    var $uibModalInstance, projectId, $q, refreshGrid, projectService, toastr, controller, $scope;

    beforeEach(angular.mock.inject(( _$q_, _ProjectService_, _toastr_, _$rootScope_) => {
        $uibModalInstance = {
            close: () => {},
            dismiss: (reason) => {}
        };
        projectId = null;
        $q = _$q_;
        projectService = _ProjectService_;
        toastr = _toastr_;
        $scope = _$rootScope_.$new();
        refreshGrid = () => {};
        controller = createController();
    }));

    function createController(_$uibModalInstance = $uibModalInstance, _projectId = projectId, _$q = $q, _refreshGrid = refreshGrid, _projectService = projectService, _toastr = toastr) {
        let controller = new ProjectModalController(_$uibModalInstance, _projectId, _$q, _refreshGrid, _projectService, _toastr);
        return controller;
    }

    describe('Constructor', () => {
        it('sets loading to true when constructed with projectId', () => {
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
            let project = {title: 'asd'};
            controller._setCurrentProject(project);
            controller._setLoading(false);
            expect(controller.loading).toBeFalsy();
            spyOn(controller, '_setLoading');
            controller.save();
            expect(controller._setLoading).toHaveBeenCalledWith(true);
        });

        it('sets loading to false after create promise resolves', () => {
            let project = {title: 'asd'};
            controller._setCurrentProject(project);
            let defer = $q.defer();
            defer.resolve(project);
            spyOn(controller, '_create').and.returnValue(defer.promise);
            controller.save();
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('sets loading to false after update promise resolves', () => {
            let project = {pk: 3, title: 'asd'};
            controller._setCurrentProject(project);
            let defer = $q.defer();
            defer.resolve(project);
            spyOn(controller, '_update').and.returnValue(defer.promise);
            controller.save();
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('calls _update() when pk is defined', () => {
            let project = {pk: 3, title: 'title saved'};
            let defer = $q.defer();
            defer.resolve(project);

            spyOn(controller, '_update').and.returnValue(defer.promise);
            spyOn(controller.toastr, 'success');
            spyOn(controller.modal, 'close');
            spyOn(controller, 'refreshGrid');

            controller._setCurrentProject(project);
            controller.save();
            $scope.$apply();

            expect(controller.toastr.success).toHaveBeenCalled();
            expect(controller.modal.close).toHaveBeenCalled();
            expect(controller.refreshGrid).toHaveBeenCalled();
        });

        it('calls _create() when pk is undefined', () => {
            let project = {title: 'title saved'};
            let defer = $q.defer();
            defer.resolve(project);

            spyOn(controller, '_create').and.returnValue(defer.promise);
            spyOn(controller.toastr, 'success');
            spyOn(controller.modal, 'close');
            spyOn(controller, 'refreshGrid');

            controller._setCurrentProject(project);
            controller.save();
            $scope.$apply();

            expect(controller.toastr.success).toHaveBeenCalled();
            expect(controller.modal.close).toHaveBeenCalled();
            expect(controller.refreshGrid).toHaveBeenCalled();
        });
    });

    describe('loadProject', () => {
        it('sets loading true when called', () => {
            spyOn(controller, '_setLoading');
            controller.loadProject();
            expect(controller._setLoading).toHaveBeenCalledWith(true);
        });

        it('sets loading to false once new project promise resolves', () => {
            let defer = $q.defer();
            defer.resolve({});
            spyOn(controller, '_newProject').and.returnValue(defer.promise);
            controller.loadProject();
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('sets loading to false once  fetch promise resolves', () => {
            let defer = $q.defer();
            defer.resolve({});
            spyOn(controller, '_fetchProject').and.returnValue(defer.promise);
            controller.loadProject(1);
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('sets loading to false once  fetch promise rejects', () => {
            let defer = $q.defer();
            defer.reject({});
            spyOn(controller, '_fetchProject').and.returnValue(defer.promise);
            controller.loadProject(1);
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('should load a new project with _setCurrentProject method', () => {
            let defer = $q.defer();
            defer.resolve({test: 'test'});
            spyOn(controller, '_newProject').and.returnValue(defer.promise);
            spyOn(controller, '_setCurrentProject');
            controller.loadProject();
            $scope.$apply();
            expect(controller._setCurrentProject).toHaveBeenCalled();
        });

        it('should call fetch project when project id is passed', () => {
            let defer = $q.defer();
            spyOn(controller, '_fetchProject').and.returnValue(defer.promise);
            controller.loadProject(3);
            expect(controller._fetchProject).toHaveBeenCalled();
        });

        it('should set project if service resolves successfully', () => {
            let defer = $q.defer();
            defer.resolve({title: 'title'});
            spyOn(controller, '_fetchProject').and.returnValue(defer.promise);
            spyOn(controller, '_setCurrentProject');
            spyOn(controller, '_setModalTitle');
            controller.loadProject(3);
            $scope.$apply();
            expect(controller._setCurrentProject).toHaveBeenCalled();
            expect(controller._setModalTitle).toHaveBeenCalled();
        });

        it('should error with toastr and change state', () => {
            let defer = $q.defer();
            defer.reject();
            spyOn(controller, '_fetchProject').and.returnValue(defer.promise);
            spyOn(controller.toastr, 'error').and.returnValue(false);
            spyOn(controller.modal, 'dismiss').and.returnValue(false);
            controller.loadProject(3);
            $scope.$apply();
            expect(controller.toastr.error).toHaveBeenCalled();
            expect(controller.modal.dismiss).toHaveBeenCalled();
        });
    });

    describe('_getCurrentProject', () => {
        it('should return the controller project object', () => {
            let project = {title: 'current title'};
            controller.project = project;
            expect(controller._getCurrentProject()).toEqual(project);
        });
    });

    describe('_setCurrentProject', () => {
        it('should set the project on the controller', () => {
            let project = {'project': 'should be set'};
            expect(controller.project).not.toEqual(project);
            controller._setCurrentProject(project);
            expect(controller.project).toEqual(project);
        });
    });

    describe('_newProject', () => {
        it('should return a default object', () => {
            let project = controller._newProject();
            expect(typeof project).toBe('object');
        });
    });

    describe('_fetchProject', () => {
        it('should return a promise', () => {
            spyOn(controller.projectService, 'fetch').and.returnValue($q.defer().promise);

            let promise = controller._fetchProject(3);

            expect(promise.constructor.name).toBe('Promise');
        });

        it('should call service fetch method', () => {
            spyOn(controller.projectService, 'fetch').and.returnValue($q.defer().promise);

            let promise = controller._fetchProject(3);

            expect(controller.projectService.fetch).toHaveBeenCalled();
        });

        it('should return service data when resolves', () => {
            let fetchPromise = $q.defer();
            let project = {title: 'fetched title'};
            fetchPromise.resolve({data: project});

            spyOn(controller.projectService, 'fetch').and.returnValue(fetchPromise.promise);
            let controllerReturn = controller._fetchProject(3);

            expect(controllerReturn.constructor.name).toBe("Promise");
            controllerReturn.then((returnValue) => {
                expect(returnValue).toBe(project);
            }, () => {
                fail();
            });

            $scope.$apply();
        });

        it('should reject when service fails', (done, fail) => {
            let fetchPromise = $q.defer();
            fetchPromise.reject();

            spyOn(controller.projectService, 'fetch').and.returnValue(fetchPromise.promise);
            let controllerReturn = controller._fetchProject(3);

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

        it('should call project service create', () => {
            let serviceDeferred = $q.defer();
            spyOn(controller.projectService, 'create').and.returnValue(serviceDeferred.promise);

            serviceDeferred.resolve({pk: '1', title: 'title'});
            controller._create({title: 'tester'});

            expect(controller.projectService.create).toHaveBeenCalled();
        });

        it('should resolve once project service create resolves', () => {
            let serviceReturn = {pk: 2, title: 'title from service'};
            let createDeferred = $q.defer();
            spyOn(controller.projectService, 'create').and.returnValue(createDeferred.promise);
            
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
            spyOn(controller.projectService, 'create').and.returnValue(createDeferred.promise);
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

        it('should call project service update', () => {
            let defer = $q.defer();
            let updateDeferred = $q.defer();
            updateDeferred.resolve({pk: '1', title: 'title'});
            spyOn(controller.projectService, 'update').and.returnValue(updateDeferred.promise);
            controller._update({pk: 2, title: 'tester'});
            expect(controller.projectService.update).toHaveBeenCalled();
        });

        it('should resolve once project service update resolves', () => {
            let serviceReturn = {pk: 2, title: 'title from service'};
            let updateDeferred = $q.defer();
            updateDeferred.resolve(serviceReturn);
            spyOn(controller.projectService, 'update').and.returnValue(updateDeferred.promise);

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
            spyOn(controller.projectService, 'update').and.returnValue(updateDeferred.promise);
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