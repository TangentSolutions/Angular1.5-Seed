import EmployeeListComponent from './employee-list/employee-list.component';
import EmployeeCrudComponent from './employee-crud/employee-crud.component';

export default angular.module('employee.components', [])
    .component('employeeList', EmployeeListComponent)
    .component('employeeCrud', EmployeeCrudComponent);
