class ProjectModalController {
    constructor($uibModalInstance, projectId, refreshGrid, ProjectService, toastr) {
        'ngInject';

        this.modalInstance = $uibModalInstance;
        this.toastr = toastr;
        this.projectService = ProjectService;
        this.refreshGrid = refreshGrid;

        if(projectId) {
            this.modalTitle = 'Updating Project ...';
            this.projectService.fetch(projectId)
            .then((response) => {
                this.project = response.data;
                this.modalTitle = `Updating Project :  ${this.project.title}`;
            }, () => {
                this.toastr.error('We where unable to load this project at the current time');
                this.modalInstance.dismiss('error');
            });
        } else {
            // Set Some Default Values for Project Model
            this.modalTitle = 'New Project ...';
            this.project = {
                is_active:true,
                is_billable: true
            };
        }
    }

    cancel() {
        this.modalInstance.dismiss('cancel');
    }

    save() {
        if(typeof this.project.pk === 'undefined') {
            this.projectService.create(this.project)
            .then(() => {
                this.toastr.success('Project Created');
                this.modalInstance.close();
                this.refreshGrid();
            }, (response) => {
                if(response.status === 400) {
                    this.$$setValidation(response.data);
                }
            });
        } else {
            this.projectService.update(this.project.pk, this.project)
            .then(() => {
                this.toastr.success('Project Updated');
                this.modalInstance.close();
                this.refreshGrid();
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

export default ProjectModalController;