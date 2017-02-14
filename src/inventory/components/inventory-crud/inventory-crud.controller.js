class InventoryCreateController {

    constructor(InventoryService, toastr, $q, $state, $stateParams) {
        'ngInject';

        this.inventoryService = InventoryService;
        this.toastr = toastr;
        this.validation = {};
        this.$state = $state;
        this.$q = $q;

        let inventoryId = $stateParams.id;
        this._setLoading(true);
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
        },
        birthday: {
            opened: false,
            open: () => {
                this.datePickers.birthday.opened = true;
            }
        },
        next_review: {
            opened: false,
            open: () => {
                this.datePickers.next_review.opened = true;
            }
        },
        review_date: {
          opened: false,
          open: () => {
            this.datePickers.review_date.opened = true;
          }

        }
      }

    save() {
        this._setLoading(true);
        // Create a clone of the current inventory as to not mess with user input
        let inventory = angular.copy(this._getCurrentInventory());

        if(typeof inventory.pk === 'undefined') {
            this._create(inventory)
                .then(() => {
                    this._setLoading(false);
                    this.toastr.success('Inventory Created');
                    this.$state.go('inventory:list');
                });
        } else {
            this._update(inventory)
                .then(() => {
                    this._setLoading(false);
                    this.toastr.success('Inventory Updated');
                    this.$state.go('inventory:list');
                });
        }
    }

    loadInventory(inventoryId = null) {
        this._setLoading(true);
        // If there is a primary key, Fetch from database
        if(inventoryId) {
            this._fetchInventory(inventoryId)
                // Set Inventory and Modal Title
                .then((inventory) => {
                    this._setCurrentInventory(inventory);
                    this._setLoading(false);
                },() => {
                    this._setLoading(false);
                    this.toastr.error('Failed to load Inventory');
                    this.$state.go('inventory:list');
                });
        }
        // Otherwise create a new instance
        else {
            this._newInventory()
                .then((response) => {
                    this._setCurrentInventory(response);
                    this._setLoading(false);
                });
        }
    }

    _getCurrentInventory() {
        return this.inventory;
    }

    _setCurrentInventory(inventory) {
        this.inventory = inventory;
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
                defer.resolve(response.data);
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

export default InventoryCreateController;
