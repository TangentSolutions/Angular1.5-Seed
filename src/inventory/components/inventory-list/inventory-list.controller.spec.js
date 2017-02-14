import InventoryListController from './inventory-list.controller';

describe('Inventory List Controller', () => {

    beforeEach(angular.mock.module('app'));

    var inventoryService;
    var toastr;
    var $uibModal;
    var $q;
    var controller;
    var $scope;

    beforeEach(angular.mock.inject(( _InventoryService_, _toastr_, _$uibModal_, _$q_, _$rootScope_) => {
        inventoryService = _InventoryService_;
        toastr = _toastr_;
        $uibModal = _$uibModal_;
        $q = _$q_;
        $scope = _$rootScope_.$new();
        controller = createController();
    }));

    function createController() {
        let controller = new InventoryListController(inventoryService, toastr, $uibModal, $q);
        return controller;
    }

    describe('onInit', () => {
        it('should call get()', () => {
            let defer = $q.defer();
            spyOn(controller.inventoryService, 'get').and.returnValue(defer.promise);
            controller.$onInit();
            expect(controller.inventoryService.get).toHaveBeenCalled();
            // controller.get();
        });
    });

    describe('order', () => {
        it('should set searchQuery.ordering', () => {
            spyOn(controller, 'get').and.returnValue(true);
            controller.order('test');
            expect(controller.searchQuery.ordering).toBe('test');
        });

        it('should call get', () => {
            spyOn(controller, 'get').and.returnValue(true);
            controller.order('test');
            expect(controller.get).toHaveBeenCalled();
        });
    });

    describe('get', () => {
        it('should pass searchQuery to inventoryServiceGet', () => {
            let defer = $q.defer();
            spyOn(controller.inventoryService, 'get').and.returnValue(defer.promise);
            controller.searchQuery = {random: 'search query'};
            controller.get();
            expect(controller.inventoryService.get).toHaveBeenCalledWith(controller.searchQuery);
        });

        it('should call _setLoading with true when get is called', () => {
            let defer = $q.defer();
            spyOn(controller.inventoryService, 'get').and.returnValue(defer.promise);
            spyOn(controller, '_setLoading');
            controller.get();
            expect(controller._setLoading).toHaveBeenCalledWith(true);
        });

        it('should call _setLoading with false when get resolves', () => {
            let defer = $q.defer();
            defer.resolve([{}]);
            spyOn(controller.inventoryService, 'get').and.returnValue(defer.promise);
            controller.get();
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('should call _setLoading with false when get rejects', () => {
            let defer = $q.defer();
            defer.reject([{}]);
            spyOn(controller.inventoryService, 'get').and.returnValue(defer.promise);
            controller.get();
            spyOn(controller, '_setLoading');
            $scope.$apply();
            expect(controller._setLoading).toHaveBeenCalledWith(false);
        });

        it('should call inventory service get', () => {
            let defer = $q.defer();
            spyOn(controller.inventoryService, 'get').and.returnValue(defer.promise);
            controller.get()
            expect(controller.inventoryService.get).toHaveBeenCalled();
        });

        it('should set the results array once inventory service resolves', () => {
            let inventoryList = [
                {
                    pk: 3,
                    title: 'third title'
                },
                {
                    pk: 4,
                    title: 'fourth title'
                }
            ];
            let defer = $q.defer();
            defer.resolve({data: inventoryList});
            spyOn(controller.inventoryService, 'get').and.returnValue(defer.promise);
            controller.get();
            $scope.$apply();
            controller.results = inventoryList;
        });

        it('should throw toastr error when inventory service does not resolve', () => {
            let defer = $q.defer();
            defer.reject();
            spyOn(controller.inventoryService, 'get').and.returnValue(defer.promise);
            spyOn(controller.toastr, 'error');
            controller.get();
            $scope.$apply();
            expect(controller.toastr.error).toHaveBeenCalled();
        });
    });

    describe('delete', () => {
        it('calls inventory service delete() with id', () => {
            let defer = $q.defer();
            spyOn(controller.inventoryService, 'delete').and.returnValue(defer.promise);
            controller.delete(2);
            expect(controller.inventoryService.delete).toHaveBeenCalledWith(2);
        });

        it('throws toast success if promise resolves', () => {
            let defer = $q.defer();
            defer.resolve();
            spyOn(controller.inventoryService, 'delete').and.returnValue(defer.promise);
            controller.delete(3);
            spyOn(controller.toastr, 'success');
            spyOn(controller, 'removeRow').and.returnValue(true);
            $scope.$apply();
            expect(controller.toastr.success).toHaveBeenCalled();
            expect(controller.removeRow).toHaveBeenCalled();
        });

        it('throws toast error if promise rejects', () => {
            let defer = $q.defer();
            defer.reject();
            spyOn(controller.inventoryService, 'delete').and.returnValue(defer.promise);
            spyOn(controller.toastr, 'error');
            controller.delete(3);
            $scope.$apply();
            expect(controller.toastr.error).toHaveBeenCalled();
        });
    });

    describe('removeRow', () => {
        it('should remove the row', () => {
            spyOn(angular, 'element').and.callThrough();
            controller.removeRow(2);
            expect(angular.element).toHaveBeenCalled();
        });
    });

    describe('create', () => {
        it('calls _openModal() method with no params', () => {
            spyOn(controller, '_openModal');
            controller.create();
            expect(controller._openModal).toHaveBeenCalled();
        });
    });

    describe('update', () => {
        it('calls _openModal() method', () => {
            spyOn(controller, '_openModal');
            controller.update(3);
            expect(controller._openModal).toHaveBeenCalledWith(3);
        });
    });

    describe('_openModal', () => {
        it('should use bootstrap ui to open modal', () => {
            spyOn(controller.$uibModal, 'open').and.returnValue(true);
            controller._openModal();
            expect(controller.$uibModal.open).toHaveBeenCalled();
        });
    });

    describe('_setLoading', () => {
        it('changes loading parameter', () => {
            controller._setLoading(false);
            expect(controller.loading).toBeFalsy();
            controller._setLoading(true);
            expect(controller.loading).toBeTruthy();
            controller._setLoading(false);
            expect(controller.loading).toBeFalsy();
        });
    });

    describe('modalResolve', () => {
        it('returns an object for modal resolve', () => {
            let object = controller.modalResolve(3);
            expect(object.inventoryId()).toBe(3);

            spyOn(controller, 'get').and.returnValue("Just some return value that will validate function binding");
            expect(object.refreshGrid()()).toEqual(controller.get());
        });
    });
});
