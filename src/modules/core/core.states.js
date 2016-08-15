var CoreStateA = () => `<app title="State A"></app>`;

var CoreStateB = ($stateParams) => `<app title="State B ${$stateParams.name}"></app>`;
CoreStateB.$inject = ['$stateParams'];

export {
  CoreStateA,
  CoreStateB
};
