export default (scope, elem, attrs, ngModel) => {
    if (!angular.isDefined(scope.asyncDebounce)) {
        scope.asyncDebounce = 300;
    }

    if (!angular.isDefined(scope.asyncBefore)) {
        scope.asyncBefore = () => {
        };
    }

    if (!angular.isDefined(scope.asyncOn)) {
        scope.asyncOn = (value) => {
            return Rx.Observable.from([value]);
        };
    }

    if (!angular.isDefined(scope.asyncAfter)) {
        scope.asyncAfter = () => {
        };
    }

    Rx.Observable.$ngModelChange = (ngModelCtrl) => {
        return Rx.Observable.create(observer => {
            ngModelCtrl.$viewChangeListeners.push(() => {
                observer.onNext(ngModelCtrl.$modelValue);
            });
        });
    };

    Rx.Observable.$ngModelChange(ngModel)
        .map((value) => {
            scope.asyncBefore(value);
            return value;
        })
        .debounce(scope.asyncDebounce)
        .flatMapLatest(scope.asyncOn)
        .subscribe((value) => {
            scope.$evalAsync(() => {
                scope.asyncAfter(value);
            });
        });
};
