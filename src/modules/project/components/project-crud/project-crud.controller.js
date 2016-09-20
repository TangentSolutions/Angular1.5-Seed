class ProjectCreateController {

    constructor(ProjectService, toastr, $state, $stateParams) {
        'ngInject';

        // Set Some Default Values for Project Model
        this.project = {
            is_active:true,
            is_billable: true
        };

        this.projectService = ProjectService;
        this.toastr = toastr;
        this.validation = {};
        this.$state = $state;

        if($state.current.name === 'project:update'){
            ProjectService.fetch($stateParams.id).then((response) => {
                this.project = angular.copy(response.data);
            }, () => {
                this.toastr.error('Failed to load Project');
                this.$state.go('project:list');
            });
        }
    }

    save() {
        if(typeof this.project.pk === 'undefined') {
            this.projectService.create(this.project)
            .then(() => {
                this.toastr.success('Project Created');
                this.$state.go('project:list');
            }, (response) => {
                if(response.status === 400) {
                    this.$$setValidation(response.data);
                }
            });
        } else {
            this.projectService.update(this.project.pk, this.project)
            .then(() => {
                this.toastr.success('Project Updated');
                this.$state.go('project:list');
            }, (response) => {
                if(response.status === 400) {
                    this.$$setValidation(response.data);
                }
            });
        }
    }

    $$setValidation(fieldErrors) {
        this.validation = {};
        angular.forEach(fieldErrors, (errors, field) => {
            this.validation[field] = [];
            angular.forEach(errors, (validationError) => {
                this.validation[field].push(validationError);
            });
        });
    }

}

export default ProjectCreateController;