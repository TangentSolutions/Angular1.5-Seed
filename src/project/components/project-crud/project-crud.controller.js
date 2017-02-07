class ProjectCreateController {

    constructor(ProjectService, toastr, $q, $state, $stateParams) {
        'ngInject';

        this.projectService = ProjectService;
        this.toastr = toastr;
        this.validation = {};
        this.$state = $state;
        this.$q = $q;

        let projectId = $stateParams.id;
        this._setLoading(true);
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

    save() {
        this._setLoading(true);
        // Create a clone of the current project as to not mess with user input
        let project = angular.copy(this._getCurrentProject());

        if(typeof project.pk === 'undefined') {
            this._create(project)
                .then(() => {
                    this._setLoading(false);
                    this.toastr.success('Project Created');
                    this.$state.go('project:list');
                });
        } else {
            this._update(project)
                .then(() => {
                    this._setLoading(false);
                    this.toastr.success('Project Updated');
                    this.$state.go('project:list');
                });
        }
    }

    loadProject(projectId = null) {
        this._setLoading(true);
        // If there is a primary key, Fetch from database
        if(projectId) {
            this._fetchProject(projectId)
                // Set Project and Modal Title
                .then((project) => {
                    this._setCurrentProject(project);
                    this._setLoading(false);
                },() => {
                    this._setLoading(false);
                    this.toastr.error('Failed to load Project');
                    this.$state.go('project:list');
                });
        } 
        // Otherwise create a new instance
        else {
            this._newProject()
                .then((response) => {
                    this._setCurrentProject(response);
                    this._setLoading(false);
                });
        }
    }

    _getCurrentProject() {
        return this.project;
    }

    _setCurrentProject(project) {
        this.project = project;
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
                defer.resolve(response.data);
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
        if( fieldErrors instanceof Array === false) {
            angular.forEach(fieldErrors, (errors, field) => {
                this.validation[field] = [];
                angular.forEach(errors, (validationError) => {
                    this.validation[field].push(validationError);
                });
            });
        }
    }

    _setLoading($value) {
        this.loading = $value;
    }

}

export default ProjectCreateController;