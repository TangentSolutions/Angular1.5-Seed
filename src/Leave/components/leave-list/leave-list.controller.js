import LeaveModalTemplate from '../leave-crud/leave-crud.template.html';
import LeaveModalController from '../leave-crud/leave-crud.controller';

class LeaveListController {

    constructor(LeaveService, toastr, $uibModal, $q) {
        'ngInject';

        this.leaveService = LeaveService;
        this.toastr = toastr;
        this.$uibModal = $uibModal;
        this.$q = $q;
        this.searchQuery = {};
        this._setLoading(true);
    }

    $onInit() {
        this.get();
    }

    order($orderBy) {
        this.searchQuery.ordering = $orderBy;
        this.get();
    }

    get() {
        this._setLoading(true);
        this.leaveService.get(this.searchQuery)
        .then((response) => {
            this._setLoading(false);
            this.results = response.data;
        }, () => {
            this._setLoading(false);
            this.toastr.error("There was an error while trying to retrieve Leaves");
        });
    }

    delete(id) {
        this.leaveService.delete(id)
        .then(() => {
            this.toastr.success('Leave Deleted');
            this.removeRow(id);
        }, () => {
            this.toastr.error('There was an error while trying to delete leave');
        });
    }

    removeRow(leaveId) {
        angular.element(document).find('#result_row_' + leaveId).remove();
    }

    create() {
        this._openModal();
    };

    update(leave_id) {
        this._openModal(leave_id);
    }

    _openModal(leaveId = null) {
        var $ctrl = this;
        this.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'crud-title',
            ariaDescribedBy: 'crud-body',
            template: LeaveModalTemplate,
            controller: LeaveModalController,
            controllerAs: '$ctrl',
            size: 'lg',
            resolve: this.crudResolve(leaveId)
        });
    }

    _setLoading($value) {
        this.loading = $value;
    }

    crudResolve(leaveId) {
        return {
            leaveId: () => {
                return leaveId;
            },
            refreshGrid: () => this.get.bind(this)
        };
    }
}

export default LeaveListController;
