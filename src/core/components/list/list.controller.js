import { autorun } from 'mobx';

class ListController {
    constructor(MobxServiceExample) {
        'ngInject';

        this.mobxServiceExample = MobxServiceExample;

        //Bind functions to current controller since they are called from somewhere else
        this.afterValidate = this.afterValidate.bind(this);
        this.beforeValidate = this.beforeValidate.bind(this);
        this.onValidate = this.onValidate.bind(this);
    }

    $onInit() {
        autorun(() => {
            this.items = this.mobxServiceExample.items;
        });

        this.invalid = false;
        this.disable = true;
    }

    addItem() {
        this.mobxServiceExample.add(this.input);

        this.input = '';
        this.invalid = false;
        this.disable = true;
    }

    beforeValidate() {
        this.disable = true;
        this.invalid = false;
    }

    onValidate(value) {
        return Rx.Observable.from([value]);
    }

    afterValidate(value) {
        if (value === undefined || value === '') {
            this.invalid = true;
        } else {
            this.disable = false;
            this.invalid = false;
        }
    }
}

export default ListController;
