class ProjectListController {

    constructor(ProjectService, toastr) {
        'ngInject';

        this.projectService = ProjectService;
        this.toastr = toastr;
    }

    $onInit() {
        this.get();
    }

    get() {
        this.projectService.get()
        .then((response) => {
            this.results = response.data;
        }, () => {
            this.toastr.error("There was an error while trying to retrieve Projects");
        });
    }

    delete(id) {
        this.projectService.delete(id)
        .then(() => {
            this.toastr.success('Project Deleted');
            angular.element('#result_row_' + id).remove();
        }, () => {
            this.toastr.error('There was an error while trying to delete project');
        });
    }

}

export default ProjectListController;