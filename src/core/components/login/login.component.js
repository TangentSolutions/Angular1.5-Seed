import LoginTemplate from './login.template.html';
import LoginController from './login.controller';

export default {
    template: LoginTemplate,
    bindings: {
      resolve: '='
    },
    controller: LoginController,
    controllerAs: '$ctrl'
};
