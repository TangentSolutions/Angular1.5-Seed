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
<<<<<<< HEAD
=======

    $onInit() {
        this.get();
    }

>>>>>>> 40be10e78bc111c13d2676fdf025bd340437a470
    get() {
        this._setLoading(true);
        this.employeeService.get(this.searchQuery)
        .then((response) => {
            this._setLoading(false);
            this.results = response.data;
        }, () => {
            this._setLoading(false);
<<<<<<< HEAD
            this.toastr.error("There was an error while trying to retrieve Employees");
=======
            this.toastr.error("There was an error while trying to retrieve Projects");
>>>>>>> 40be10e78bc111c13d2676fdf025bd340437a470
        });
    }
  }
export default EmployeeListController;
