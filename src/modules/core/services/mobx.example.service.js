import { observable, computed } from 'mobx';

class MobxServiceExample {
    @observable items = [];

    @computed get length() {
        return this.items.length;
    };

    add(value) {
        this.items.push({value: value});
    };

    remove(index) {
        this.items.splice(index > 0 ? index: 0, 1);
    };
}

export default MobxServiceExample;
