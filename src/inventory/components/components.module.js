import InventoryListComponent from './inventory-list/inventory-list.component';
import InventoryCrudComponent from './inventory-crud/inventory-crud.component';

export default angular.module('inventory.components', [])
    .component('inventoryList', InventoryListComponent)
    .component('inventoryCrud', InventoryCrudComponent);
