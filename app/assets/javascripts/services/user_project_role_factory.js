samson.factory('userProjectRoleFactory', function() {

  function UserProjectRole(id, user_id, project_id, role_id) {
    this.id = id;
    this.user_id = user_id;
    this.project_id = project_id;
    this.role_id = role_id;
  }

  UserProjectRole.prototype.withUserName = function(user_name){
    this.user_name = user_name;
    return this;
  };

  UserProjectRole.prototype.withProjectName = function(project_name) {
    this.project_name = project_name;
    return this;
  };

  UserProjectRole.prototype.exists = function() {
    //If id contains a valid number, this role has already been created in the database
    return _.isNumber(this.id);
  };

  UserProjectRole.prototype.buildCreatePayload = function() {
    return JSON.stringify(this, ['user_id', 'project_id', 'role_id']);
  };

  UserProjectRole.prototype.buildUpdatePayload = function() {
    return JSON.stringify(this, ['role_id']);
  };

  UserProjectRole.build = function(id, user_id, project_id, role_id) {
    return new UserProjectRole(id, user_id, project_id, role_id);
  };

  UserProjectRole.buildFromDom = function(element) {
    var id = toInteger(element.getAttribute('data-id'));
    var user_id = toInteger(element.getAttribute('data-user-id'));
    var project_id = toInteger(element.getAttribute('data-project-id'));
    var role_id = toInteger(element.getAttribute('data-role-id'));
    var user_name = element.getAttribute('data-user-name');
    var project_name = element.getAttribute('data-project-name');

    return UserProjectRole.build(id, user_id, project_id, role_id)
      .withUserName(user_name)
      .withProjectName(project_name);
  };

  function toInteger(value) {
    return _.isString(value) && value.length ? parseInt(value) : undefined;
  }

  return UserProjectRole;
});
