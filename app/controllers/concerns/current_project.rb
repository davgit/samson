module CurrentProject
  extend ActiveSupport::Concern

  included do
    helper_method :current_project
  end

  def current_project
    @project ||= (Project.find_by_param!(params[:project_id]) if params.try(:[], :project_id))
  end
end
