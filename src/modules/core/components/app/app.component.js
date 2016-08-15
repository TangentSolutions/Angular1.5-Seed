//Load Template Using Text Plugin for SystemJS
import AppTemplate from './app.template.html!text';
import AppController from './app.controller';
//Load Styles Using CSS Plugin for SystemJS
import './app.style.css!';

//Components are plain objects
export default {
  template: AppTemplate,
  controller: AppController,
  controllerAs: '$ctrl'
};
