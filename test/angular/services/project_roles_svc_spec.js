'use strict';

describe("Service: projectRolesService", function() {

  var projectRolesService, httpBackend, userProjectRoleFactory;

  beforeEach(function() {
    module("samson");
  });

  beforeEach(inject(function(_projectRolesService_, $httpBackend, _userProjectRoleFactory_) {
    projectRolesService = _projectRolesService_;
    httpBackend = $httpBackend;
    userProjectRoleFactory = _userProjectRoleFactory_;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  it('should handle GET request for loading the project roles catalog', function() {
    var expected = [{id: 0, display_name: 'Deployer'}, {id: 1, display_name: 'Admin'}];

    httpBackend.expectGET('/project_roles').respond(expected);

    projectRolesService.loadProjectRoles().then(function(response) {
      expect(response.data).toEqual(expected)
    });

    httpBackend.flush();
  });

  it('should handle POST requests for creating a new project role', function() {
    var user_id = 1;
    var project_id = 2;
    var role_id = 0;

    var project_role = userProjectRoleFactory.build(undefined, user_id, project_id, role_id);
    var expected_post_data = project_role.buildCreatePayload();
    var expected_response = {id: 0, user_id: user_id, project_id: project_id, role_id: role_id};

    httpBackend.expectPOST('/projects/' + project_role.project_id + '/project_roles', expected_post_data)
      .respond(expected_response);

    projectRolesService.createProjectRole(project_role).then(function() {
      //Id should have bene updated by the service
      expect(project_role.id).toBe(0);
    });

    httpBackend.flush();
  });

  it('should handle PUT requests to update an existing project role', function() {
    var id = 0;
    var user_id = 1;
    var project_id = 2;
    var role_id = 0;

    var project_role = userProjectRoleFactory.build(id, user_id, project_id, role_id);
    var post_data = project_role.buildUpdatePayload();
    var expected_response = {id: id, user_id: user_id, project_id: project_id, role_id: role_id};

    httpBackend.expectPUT('/projects/' + project_role.project_id + '/project_roles/' + project_role.id, post_data)
      .respond(expected_response);

    projectRolesService.updateProjectRole(project_role).then(function() {
      //Nothing should have been changed on the service
      expect(project_role.id).toBe(id);
      expect(project_role.user_id).toBe(user_id);
      expect(project_role.project_id).toBe(project_id);
      expect(project_role.role_id).toBe(role_id);
    });

    httpBackend.flush();
  });
});
