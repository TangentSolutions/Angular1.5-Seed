import angular from 'angular';

import AsyncChange from './custom/custom.directive';

export default angular.module('core.directives', [])
  .directive('asyncChange', AsyncChange)
  .name;
