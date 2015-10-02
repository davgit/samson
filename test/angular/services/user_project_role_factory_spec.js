'use strict';

describe("Factory: userProjectRoleFactory", function() {

  var userProjectRoleFactory;

  beforeEach(function() {
    module("samson");
  });

  beforeEach(inject(function(_userProjectRoleFactory_) {
    userProjectRoleFactory = _userProjectRoleFactory_;
  }));

  it('should create a new object from the given attributes', function() {
    var project_role = userProjectRoleFactory.build(0, 1, 2, 3);
    expect(project_role.id).toBe(0);
    expect(project_role.user_id).toBe(1);
    expect(project_role.project_id).toBe(2);
    expect(project_role.role_id).toBe(3);
  });

  it('should create a new object from the given DOM element', function() {
    var element = angular.element('<form data-id="" data-user-id="1" data-user-name="Some user" data-project-id="2" data-project-name="Some project" data-role-id="0"></form>');

    var project_role = userProjectRoleFactory.buildFromDom(element[0]);
    expect(project_role.id).toBe(undefined);
    expect(project_role.user_id).toBe(1);
    expect(project_role.project_id).toBe(2);
    expect(project_role.role_id).toBe(0);
    expect(project_role.user_name).toBe("Some user");
    expect(project_role.project_name).toBe("Some project");

    element = angular.element('<form data-id="3" data-user-id="1" data-user-name="Some user" data-project-id="2" data-project-name="Some project" data-role-id="0"></form>');

    project_role = userProjectRoleFactory.buildFromDom(element[0]);
    expect(project_role.id).toBe(3);
    expect(project_role.user_id).toBe(1);
    expect(project_role.project_id).toBe(2);
    expect(project_role.role_id).toBe(0);
    expect(project_role.user_name).toBe("Some user");
    expect(project_role.project_name).toBe("Some project");
  });

  it('should return a proper JSON payload for a create operation', function() {
    var project_role = userProjectRoleFactory.build(0, 1, 2, 3);

    var json_obj = JSON.parse(project_role.buildCreatePayload());
    expect(json_obj.id).toBe(undefined);
    expect(json_obj.user_id).toBe(1);
    expect(json_obj.project_id).toBe(2);
    expect(json_obj.role_id).toBe(3);
  });

  it('should return a proper JSON payload for an update operation', function() {
    var project_role = userProjectRoleFactory.build(0, 1, 2, 3);

    var json_obj = JSON.parse(project_role.buildUpdatePayload());
    expect(json_obj.id).toBe(undefined);
    expect(json_obj.user_id).toBe(undefined);
    expect(json_obj.project_id).toBe(undefined);
    expect(json_obj.role_id).toBe(3);
  });
});
