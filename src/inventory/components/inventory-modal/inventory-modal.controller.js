class InventoryModalController {

    constructor($uibModalInstance, inventoryId, $q, refreshGrid, InventoryService, toastr) {
        'ngInject';

        // The modal instance opened from Inventory List
        this.modal = $uibModalInstance;
        this.toastr = toastr;
        this.inventoryService = InventoryService;

        // refreshGrid -> InventoryListController.get()
        this.refreshGrid = refreshGrid;
        this.$q = $q;
        this._setLoading(true);

        // Load the inventory referenced into local variables
        this.loadInventory(inventoryId);
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
        // Create a clone of current inventory as to not mess with user input.
        let inventory = angular.copy(this._getCurrentInventory());

        if(typeof inventory.pk === 'undefined') {
            this._create(inventory)
                .then(() => {
                    this.toastr.success('Inventory Created');
                    this.modal.close();
                    this.refreshGrid();
                    this._setLoading(false);
                });
        } else {
            this._update(inventory)
                .then(() => {
                    this.toastr.success('Inventory Updated');
                    this.modal.close();
                    this.refreshGrid();
                    this._setLoading(false);
                });
        }
    }

    loadInventory(inventoryId = null) {
        this._setLoading(true);
        // If there is a primary key, Fetch from database
        if(inventoryId) {
            // Set Preliminary Modal Title
            this._setModalTitle('Update Inventory : ...');

            this._fetchInventory(inventoryId)
                // Set Inventory and Modal Title
                .then((inventory) => {
                    this._setModalTitle(`Update Inventory : ${inventory.title}`);
                    this._setCurrentInventory(inventory);
                    this._setLoading(false);
                },() => {
                    this.toastr.error('We where unable to load this inventory at the current time');
                    this.modal.dismiss('error');
                    this._setLoading(false);
                });
        }
        // Otherwise create a new instance
        else {
            this._setModalTitle('New Inventory ...');
            this._newInventory()
                .then((response) => {
                    this._setCurrentInventory(response);
                    this._setLoading(false);
                });
        }
    }

    _getCurrentInventory(inventory) {
        return this.inventory;
    }

    _setCurrentInventory(inventory) {
        this.inventory = inventory;
    }

    _setModalTitle(title) {
        this.modalTitle = title;
    }

    _newInventory() {
        let defer = this.$q.defer();

        this.inventoryService.getNewInventoryDefaults()
            .then((response) => {
                defer.resolve(response);
            });

        return defer.promise;
    }

    _fetchInventory(inventoryId) {
        let defer = this.$q.defer();

        this.inventoryService.fetch(inventoryId)
            .then((response) => {
                let inventory = response.data;
                defer.resolve(inventory);
            }, () => {
                defer.reject();
            });

        return defer.promise;
    }

    _create(inventory) {
        let defer = this.$q.defer();
        this.inventoryService.create(inventory)
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

    _update(inventory) {
        let defer = this.$q.defer();
        this.inventoryService.update(inventory.pk, inventory)
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

export default InventoryModalController;
