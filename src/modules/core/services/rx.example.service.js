class RxServiceExample {
    get() {
        return Rx.Observable.fromPromise(Promise.resolve({text: 'Application'}));
    }
}

export default RxServiceExample;
