class UsersController < ApplicationController
  include ProjectLevelAuthorization

  before_action :authorize_project_admin!

  def index
    @project = current_project
    @users = User.search_by_criteria(params)

    respond_to do |format|
      format.html
      format.json { render json: @users }
    end
  end
end
