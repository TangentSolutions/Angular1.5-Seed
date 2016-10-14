import ProjectModalTemplate from '../project-modal/project-modal.template.html';
import ProjectModalController from '../project-modal/project-modal.controller';

class ProjectListController {

    constructor(ProjectService, toastr, $uibModal, $q) {
        'ngInject';

        this.projectService = ProjectService;
        this.toastr = toastr;
        this.$uibModal = $uibModal;
        this.$q = $q;
        this.searchQuery = {};
        this._setLoading(true);
    }

    $onInit() {
        this.get();
    }

    order($orderBy) {
        this.searchQuery.ordering = $orderBy;
        this.get();
    }

    get() {
        this._setLoading(true);
        this.projectService.get(this.searchQuery)
        .then((response) => {
            this._setLoading(false);
            this.results = response.data;
        }, () => {
            this._setLoading(false);
            this.toastr.error("There was an error while trying to retrieve Projects");
        });
    }

    delete(id) {
        this.projectService.delete(id)
        .then(() => {
            this.toastr.success('Project Deleted');
            this.removeRow(id);
        }, () => {
            this.toastr.error('There was an error while trying to delete project');
        });
    }

    removeRow(projectId) {
        angular.element(document).find('#result_row_' + projectId).remove();
    } 

    create() {
        this._openModal();
    };

    update(project_id) {
        this._openModal(project_id);
    }

    _openModal(projectId = null) {
        var $ctrl = this;
        this.$uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: ProjectModalTemplate,
            controller: ProjectModalController,
            controllerAs: '$ctrl',
            size: 'lg',
            resolve: this.modalResolve(projectId)
        });
    }

    _setLoading($value) {
        this.loading = $value;
    }

    modalResolve(projectId) {
        return {
            projectId: () => {
                return projectId;
            },
            refreshGrid: () => this.get.bind(this)
        };
    }
}

export default ProjectListController;