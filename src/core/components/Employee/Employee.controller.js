import {
    autorun
} from 'mobx';

class EmployeeController {
    constructor(MobxServiceExample) {
        'ngInject';
        this.mobxServiceExample = MobxServiceExample;
    }

    $onInit() {
        autorun(() => {
            this.Employee = this.mobxServiceExample.items.length;
        });
    }
}

export default EmployeeController;
