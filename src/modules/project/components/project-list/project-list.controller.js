class ProjectListController {
    constructor(ProjectService, toastr, $http, $cookies) {
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
        }, () => {
            this.toastr.error("errors while fetching projects");
        });
    }
}

export default ProjectListController;