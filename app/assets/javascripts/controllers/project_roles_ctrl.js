samson.controller('ProjectRolesCtrl', function($scope, $element, $filter, userProjectRoleFactory, projectRoleFactory, projectRolesService, messageCenterService) {
  $scope.project_role = {};
  $scope.roles = [];

  $scope.initModel = function() {
    $scope.project_role = userProjectRoleFactory.buildFromDom($element[0]);
    loadProjectRoles();
  };

  $scope.$watch('project_role.role_id', function(new_role_value, old_role_value) {
    if (new_role_value !== old_role_value) {
      if ($scope.project_role.exists()) {
        return updateProjectRole($scope.project_role, new_role_value);
      }
      else {
        return createProjectRole($scope.project_role, new_role_value);
      }
    }
  });

  function loadProjectRoles() {
    projectRolesService.loadProjectRoles().then(
      function(response) {
        $scope.roles = response.data.map(function(item){
          return projectRoleFactory.buildFromJson(item);
        });
      }
    );
  }

  function createProjectRole(project_role) {
    projectRolesService.createProjectRole(project_role).then(
      function() {
        //Success
        showSuccessMessage('User ' + project_role.user_name + ' has been granted the role ' + roleNameFor(project_role.role_id) + ' for project ' + project_role.project_name);
      },
      function() {
        //Failure
        showErrorMessage("Failed to assign role '" + roleNameFor(project_role.role_id) + "' to User " + project_role.user_name + " on project " + project_role.project_name);
      }
    );
  }

  function updateProjectRole(project_role) {
    projectRolesService.updateProjectRole(project_role).then(
      function() {
        //Success
        showSuccessMessage('User ' + project_role.user_name + ' has been granted the role ' + roleNameFor(project_role.role_id) + ' for project ' + project_role.project_name);
      },
      function() {
        //Failure
        showErrorMessage("Failed to assign role '" + roleNameFor(project_role.role_id) + "' to User " + project_role.user_name + " on project " + project_role.project_name);
      }
    );
  }

  function roleNameFor(role_id) {
    var filtered = $filter('filter')($scope.roles, {id: role_id});
    return filtered ? filtered[0].display_name : '';
  }

  function showSuccessMessage(message) {
    messageCenterService.add('success', message);
  }

  function showErrorMessage(message) {
    messageCenterService.add('danger', message);
  }
});
