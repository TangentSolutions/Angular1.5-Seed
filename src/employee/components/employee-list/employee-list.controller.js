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
  }
export default EmployeeListController;
