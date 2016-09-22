import { observable } from 'mobx';

class MobxServiceExample {
    items = observable([]);

    add(value) {
        this.items.push({value: value});
    };

    remove(index) {
        this.items.splice(index > 0 ? index: 0, 1);
    };
}

export default MobxServiceExample;
