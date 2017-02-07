class EmployeeModalController {

    constructor($uibModalInstance, employeeId, $q, refreshGrid, EmployeeService, toastr) {
        'ngInject';

        // The modal instance opened from Employee List
        this.modal = $uibModalInstance;
        this.toastr = toastr;
        this.employeeService = EmployeeService;

        // refreshGrid -> EmployeeListController.get()
        this.refreshGrid = refreshGrid;
        this.$q = $q;
        this._setLoading(true);

        // Load the employee referenced into local variables
        this.loadEmployee(employeeId);
    }

    export default EmployeeModalController;
