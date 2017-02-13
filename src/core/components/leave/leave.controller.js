import {
    autorun
} from 'mobx';

class LeaveController {
    constructor(MobxServiceExample) {
        'ngInject';

    }

    datePickers = {
        startDate: {
            opened: false,
            open: () => {
                this.datePickers.startDate.opened = true;
            }
        },
        endDate: {
            opened: false,
            open: () => {
                this.datePickers.endDate.opened = true;
            }
        }



export default LeaveController;
