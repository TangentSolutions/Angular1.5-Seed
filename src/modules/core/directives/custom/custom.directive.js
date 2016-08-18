import angular from 'angular';

var asyncChange =  function () {
  return {
    restrict: 'A',
    scope: {
      /*
        asyncService: This should return an Rx.Observable containing the value to be used to validate.

        - will recevie a single input when called
        - will be called after the debounce delay
      */
      asyncService: '=?',
      /*
        asyncResolve: This function can be used to validate using the Rx.Observable result value from asyncService

        - will receive a single input when called
        - will be called after debounce and asyncService
      */
      asyncResolve: '=?',
      /*
        asyncDebounce: This will debounce model changes with X ms
      */
      asyncDebounce: '=?'
    },
    require: '^ngModel',
    link: (scope, elem, attrs, ngModel) => {
      //Default debounce 300ms
      if (!angular.isDefined(scope.asyncDebounce)) {
        scope.asyncDebounce = 300;
      }
      //Default service call if none is provided, simple fall through
      if (!angular.isDefined(scope.asyncService)) {
        scope.asyncService = (value) => {
          return Rx.Observable.from([value]);
        }
      }
      //Default resolve if none is provided
      if (!angular.isDefined(scope.asyncResolve)) {
        scope.asyncResolve = () => {};
      }

      Rx.Observable.$ngModelChange = (ngModelCtrl) => {
        return Rx.Observable.create(observer => {
          ngModelCtrl.$viewChangeListeners.push(() => {
            observer.onNext(ngModelCtrl.$modelValue);
          });
        });
      };

      //Observes changes on ngModel.$modelValue
      Rx.Observable.$ngModelChange(ngModel)
        .debounce(scope.asyncDebounce)
        .flatMapLatest(scope.asyncService)
        .subscribe((value) => {
          scope.$evalAsync(() => {
            scope.asyncResolve(value);
          });
        });

    }
  }
};

export default asyncChange;
