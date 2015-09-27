samson.service('projectRolesService', function ($http, $q) {

    this.loadProjectRoles = function () {
        return $http.get('/project_roles');
    };

    this.createProjectRole = function (project_role) {
        var data = {
            user_id: project_role.user_id,
            project_id: project_role.project_id,
            role_id: project_role.role_id
        };

        return $http.post('/projects/' + project_role.project_id + '/project_roles', {project_role: data});
    };

    this.updateProjectRole = function (project_role) {
        var data = {
            role_id: project_role.role_id
        };

        return $http.put('/projects/' + project_role.project_id + '/project_roles/' + project_role.id, {project_role: data});
    };
});