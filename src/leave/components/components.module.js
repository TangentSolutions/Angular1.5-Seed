import LeaveListComponent from './leave-list/leave-list.component';
import LeaveCrudComponent from './leave-crud/leave-crud.component';

export default angular.module('leave.components', [])
    .component('leaveList', LeaveListComponent)
    .component('leaveCrud', LeaveCrudComponent);
