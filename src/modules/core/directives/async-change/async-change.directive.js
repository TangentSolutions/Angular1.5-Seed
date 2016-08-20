import link from './async-change.link';

var asyncChange = function () {
    return {
        restrict: 'A',
        scope: {
            asyncBefore: '=?',
            asyncOn: '=?',
            asyncAfter: '=?',
            asyncDebounce: '=?'
        },
        require: '^ngModel',
        link: link
    };
};

export default asyncChange;
