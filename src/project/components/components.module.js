import ProjectListComponent from './project-list/project-list.component';
import ProjectCrudComponent from './project-crud/project-crud.component';

export default angular.module('project.components', [])
    .component('projectList', ProjectListComponent)
    .component('projectCrud', ProjectCrudComponent);
