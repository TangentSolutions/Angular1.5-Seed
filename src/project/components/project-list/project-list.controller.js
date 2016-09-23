import ProjectModalTemplate from '../project-modal/project-modal.template.html';
import ProjectModalController from '../project-modal/project-modal.controller';

class ProjectListController {

    constructor(ProjectService, toastr, $uibModal, $q) {
        'ngInject';

        this.projectService = ProjectService;
        this.toastr = toastr;
        this.$uibModal = $uibModal;
        this.$q = $q;
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

    create() {
        this.$$openModal();
    };

    update(project_id) {
        this.$$openModal(project_id);
    }

    $$openModal(projectId = null) {
        var $ctrl = this;
        this.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: ProjectModalTemplate,
            controller: ProjectModalController,
            controllerAs: '$ctrl',
            size: 'lg',
            resolve: {
                projectId: () => {
                    return projectId;
                },
                refreshGrid: () => $ctrl.get.bind($ctrl)
            }
        });
    }
}

export default ProjectListController;