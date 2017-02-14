import InventoryModalTemplate from '../inventory-modal/inventory-modal.template.html';
import InventoryModalController from '../inventory-modal/inventory-modal.controller';

class InventoryListController {

    constructor(InventoryService, toastr, $uibModal, $q) {
        'ngInject';

        this.inventoryService = InventoryService;
        this.toastr = toastr;
        this.$uibModal = $uibModal;
        this.$q = $q;
        this.searchQuery = {};
        this._setLoading(true);
    }

    $onInit() {
        this.get();
        this.isSuperUser = this.inventoryService.isSuperUser();
    }

    order($orderBy) {
        this.searchQuery.ordering = $orderBy;
        this.get();
    }

    get() {
        this._setLoading(true);
        this.inventoryService.get(this.searchQuery)
        .then((response) => {
            this._setLoading(false);
            this.results = response.data;
        }, () => {
            this._setLoading(false);
            this.toastr.error("There was an error while trying to retrieve Inventorys");
        });
    }

    delete(id) {
        this.inventoryService.delete(id)
        .then(() => {
            this.toastr.success('Inventory Deleted');
            this.removeRow(id);
        }, () => {
            this.toastr.error('There was an error while trying to delete inventory');
        });
    }

    removeRow(inventoryId) {
        angular.element(document).find('#result_row_' + inventoryId).remove();
    }

    create() {
        this._openModal();
    };

    update(inventory_id) {
        this._openModal(inventory_id);
    }

    _openModal(inventoryId = null) {
        var $ctrl = this;
        this.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: InventoryModalTemplate,
            controller: InventoryModalController,
            controllerAs: '$ctrl',
            size: 'lg',
            resolve: this.modalResolve(inventoryId)
        });
    }

    _setLoading($value) {
        this.loading = $value;
    }

    modalResolve(inventoryId) {
        return {
            inventoryId: () => {
                return inventoryId;
            },
            refreshGrid: () => this.get.bind(this)
        };
    }
}

export default InventoryListController;
