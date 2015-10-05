class StarsController < ApplicationController
  include CurrentProject

  def create
    @project = current_project
    current_user.stars.create!(project: @project)

    head :ok
  end

  def destroy
    @project = current_project
    star = current_user.stars.find_by_project_id(@project.id)
    star && star.destroy

    head :ok
  end
end
