import { autorun } from 'mobx';

class CountController {
    constructor(MobxServiceExample) {
        'ngInject';
        this.mobxServiceExample = MobxServiceExample;
    }

    $onInit() {
        autorun(() => {
            this.count = this.mobxServiceExample.items.length;
        });
    }
}

export default CountController;
