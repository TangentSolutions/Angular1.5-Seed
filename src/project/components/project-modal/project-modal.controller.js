class ProjectModalController {

    constructor($uibModalInstance, projectId, $filter, $q, refreshGrid, ProjectService, toastr) {
        'ngInject';

        // The modal instance opened from Project List
        this.modal = $uibModalInstance;
        this.toastr = toastr;
        this.projectService = ProjectService;

        // refreshGrid -> ProjectListController.get()
        this.refreshGrid = refreshGrid;
        this.$q = $q;

        // Load the project referenced into local variables
        this.loadProject(projectId);
    }

    datePickers = {
        startDate: {
            opened: false,
            open: () => {
                this.datePickers.startDate.opened = true;
            }
        },
        endDate: {
            opened: false,
            open: () => {
                this.datePickers.endDate.opened = true;
            }
        }
    }

    cancel() {
        this.modal.dismiss('cancel');
    }

    save() {
        // Create a clone of current project as to not mess with user input.
        let project = angular.copy(this._getCurrentProject());

        if(typeof project.pk === 'undefined') {
            this._create(project)
                .then(() => {
                    this.toastr.success('Project Created');
                    this.modal.close();
                    this.refreshGrid();
                });
        } else {
            this._update(project)
                .then(() => {
                    this.toastr.success('Project Updated');
                    this.modal.close();
                    this.refreshGrid();
                });
        }
    }

    loadProject(projectId = null) {
        // If there is a primary key, Fetch from database
        if(projectId) {
            // Set Preliminary Modal Title
            this._setModalTitle('Update Project : ...');

            this._fetchProject(projectId)
                // Set Project and Modal Title
                .then((project) => {
                    this._setModalTitle(`Update Project : ${project.title}`);
                    this._setCurrentProject(project);
                },() => {
                    this.toastr.error('We where unable to load this project at the current time');
                    this.modal.dismiss('error');
                });
        } 
        // Otherwise create a new instance
        else {
            this._setModalTitle('New Project ...');
            this._setCurrentProject(this._newProject());
        }
    }

    _getCurrentProject(project) {
        return this.project;
    }

    _setCurrentProject(project) {
        this.project = project;
    }

    _setModalTitle(title) {
        this.modalTitle = title;
    }

    _newProject() {
        // Set some default values for Project
        let project = {
            is_active:true,
            is_billable: true
        };

        return project;
    }

    _fetchProject(projectId) {
        let defer = this.$q.defer();

        this.projectService.fetch(projectId)
            .then((response) => {
                let project = response.data;
                defer.resolve(project);
            }, () => {
                defer.reject();
            });

        return defer.promise;
    }

    _create(project) {
        let defer = this.$q.defer();
        this.projectService.create(project)
        .then((response) => {
            defer.resolve(response);
        }, (response) => {
            if(response.status === 400) {
                this._setValidation(response.data);
            }
            defer.reject(response);
        });
        return defer.promise;
    }

    _update(project) {
        let defer = this.$q.defer();
        this.projectService.update(project.pk, project)
        .then((response) => {
            defer.resolve(response);
        }, (response) => {
            if(response.status === 400) {
                this._setValidation(response.data);
            }
            defer.reject(response);
        });
        return defer.promise;
    }

    _setValidation(fieldErrors) {
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