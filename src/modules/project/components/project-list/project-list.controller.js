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
        .then((result) => {
            this.results = result.data;
        }, (response) => {
            this.toastr.error("There was an error while trying to retrieve Projects");
        });
    }
}

export default ProjectListController;