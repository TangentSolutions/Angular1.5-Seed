import angular from 'angular';

import link from './async-change.link';

var asyncChange =  function () {
  return {
    restrict: 'A',
    scope: {
      /*
        asyncBefore: This will execute everytime before a delay this can be used to determine when a change was made
        even before the service call is started

        - will execute on any change to the ngModel
      */
      asyncBefore: '=?',
      /*
        asyncOn: This should return an Rx.Observable containing the value to be used to validate.

        - will recevie a single input when called
        - will be called after the debounce delay
      */
      asyncOn: '=?',
      /*
        asyncAfter: This function can be used to validate using the Rx.Observable result value from asyncService

        - will receive a single input when called
        - will be called after debounce and asyncService
      */
      asyncAfter: '=?',
      /*
        asyncDebounce: This will debounce model changes with X ms
      */
      asyncDebounce: '=?'
    },
    require: '^ngModel',
    link: link
  }
};

export default asyncChange;
