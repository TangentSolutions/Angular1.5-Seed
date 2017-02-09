import EmployeeModalTemplate from '../employee-modal/employee-modal.template.html';
import EmployeeModalController from '../employee-modal/employee-modal.controller';

class EmployeeListController {

    constructor(EmployeeService, toastr, $uibModal, $q) {
        'ngInject';

        this.employeeService = EmployeeService;
        this.toastr = toastr;
        this.$uibModal = $uibModal;
        this.$q = $q;
        this.searchQuery = {};
        this._setLoading(true);
    }

    $onInit() {
        this.get();
        this.isSuperUser = this.employeeService.isSuperUser();
    }

    order($orderBy) {
        this.searchQuery.ordering = $orderBy;
        this.get();
    }

    get() {
        this._setLoading(true);
        this.employeeService.get(this.searchQuery)
        .then((response) => {
            this._setLoading(false);
            this.results = response.data;
        }, () => {
            this._setLoading(false);
            this.toastr.error("There was an error while trying to retrieve Employees");
        });
    }

    delete(id) {
        this.employeeService.delete(id)
        .then(() => {
            this.toastr.success('Employee Deleted');
            this.removeRow(id);
        }, () => {
            this.toastr.error('There was an error while trying to delete employee');
        });
    }

    removeRow(employeeId) {
        angular.element(document).find('#result_row_' + employeeId).remove();
    }

    create() {
        this._openModal();
    };

    update(employee_id) {
        this._openModal(employee_id);
    }

    _openModal(employeeId = null) {
        var $ctrl = this;
        this.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: EmployeeModalTemplate,
            controller: EmployeeModalController,
            controllerAs: '$ctrl',
            size: 'lg',
            resolve: this.modalResolve(employeeId)
        });
    }

    _setLoading($value) {
        this.loading = $value;
    }

    modalResolve(employeeId) {
        return {
            employeeId: () => {
                return employeeId;
            },
            refreshGrid: () => this.get.bind(this)
        };
    }
}

export default EmployeeListController;
