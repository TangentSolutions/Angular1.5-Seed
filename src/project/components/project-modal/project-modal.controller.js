class ProjectModalController {

    constructor($uibModalInstance, projectId, $q, refreshGrid, ProjectService, toastr) {
        'ngInject';

        // The modal instance opened from Project List
        this.modal = $uibModalInstance;
        this.toastr = toastr;
        this.projectService = ProjectService;

        // refreshGrid -> ProjectListController.get()
        this.refreshGrid = refreshGrid;
        this.$q = $q;
        this._setLoading(true);

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
        this._setLoading(true);
        // Create a clone of current project as to not mess with user input.
        let project = angular.copy(this._getCurrentProject());

        if(typeof project.pk === 'undefined') {
            this._create(project)
                .then(() => {
                    this.toastr.success('Project Created');
                    this.modal.close();
                    this.refreshGrid();
                    this._setLoading(false);
                });
        } else {
            this._update(project)
                .then(() => {
                    this.toastr.success('Project Updated');
                    this.modal.close();
                    this.refreshGrid();
                    this._setLoading(false);
                });
        }
    }

    loadProject(projectId = null) {
        this._setLoading(true);
        // If there is a primary key, Fetch from database
        if(projectId) {
            // Set Preliminary Modal Title
            this._setModalTitle('Update Project : ...');

            this._fetchProject(projectId)
                // Set Project and Modal Title
                .then((project) => {
                    this._setModalTitle(`Update Project : ${project.title}`);
                    this._setCurrentProject(project);
                    this._setLoading(false);
                },() => {
                    this.toastr.error('We where unable to load this project at the current time');
                    this.modal.dismiss('error');
                    this._setLoading(false);
                });
        } 
        // Otherwise create a new instance
        else {
            this._setModalTitle('New Project ...');
            this._newProject()
                .then((response) => {
                    this._setCurrentProject(response);
                    this._setLoading(false);
                });
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
        let defer = this.$q.defer();

        this.projectService.getNewProjectDefaults()
            .then((response) => {
                defer.resolve(response);
            });

        return defer.promise;
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

    _setLoading($value) {
        this.loading = $value;
    }

    _setValidation(fieldErrors) {
        this.validation = {};
        if( fieldErrors instanceof Array === false) {
            angular.forEach(fieldErrors, (errors, field) => {
                this.validation[field] = [];
                angular.forEach(errors, (validationError) => {
                    this.validation[field].push(validationError);
                });
            });
        }
    }
}

export default ProjectModalController;