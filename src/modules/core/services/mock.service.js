class MockService {
  get() {
    return Rx.Observable.fromPromise(Promise.resolve({text: 'Application'}))
  }
};


export default MockService;
