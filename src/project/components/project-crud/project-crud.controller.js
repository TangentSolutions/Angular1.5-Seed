class ProjectCreateController {

    constructor(ProjectService, toastr, $state, $q, $stateParams) {
        'ngInject';

        this.projectService = ProjectService;
        this.toastr = toastr;
        this.validation = {};
        this.$state = $state;
        this.$q = $q;

        let projectId = $stateParams.id;
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
        // Create a clone of the current project as to not mess with user input
        let project = angular.copy(this._getCurrentProject());

        if(typeof project.pk === 'undefined') {
            this._create(project)
                .then(() => {
                    this.toastr.success('Project Created');
                    this.$state.go('project:list');
                });
        } else {
            this._update(project)
                .then(() => {
                    this.toastr.success('Project Updated');
                    this.$state.go('project:list');
                });
        }
    }

    loadProject(projectId = null) {
        // If there is a primary key, Fetch from database
        if(projectId) {
            this._fetchProject(projectId)
                // Set Project and Modal Title
                .then((project) => {
                    this._setCurrentProject(project);
                },() => {
                    this.toastr.error('Failed to load Project');
                    this.$state.go('project:list');
                });
        } 
        // Otherwise create a new instance
        else {
            this._setCurrentProject(this._newProject());
        }
    }

    _getCurrentProject() {
        return this.project;
    }

    _setCurrentProject(project) {
        this.project = project;
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

export default ProjectCreateController;