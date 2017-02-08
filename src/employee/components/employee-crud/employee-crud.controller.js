class EmployeeCreateController {

    constructor(EmployeeService, toastr, $q, $state, $stateParams) {
        'ngInject';

        this.employeeService = EmployeeService;
        this.toastr = toastr;
        this.validation = {};
        this.$state = $state;
        this.$q = $q;

        let employeeId = $stateParams.id;
        //this._setLoading(true);
        this.loadEmployee(employeeId);
    }

  }
export default EmployeeCreateController;
