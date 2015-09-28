class BuildsController < ApplicationController
  include CurrentProject
  include ProjectLevelAuthorization

  before_action do
    find_project(params[:project_id])
  end

  before_action :authorize_project_deployer!

  before_action :find_build, only: [:show, :build_docker_image, :edit, :update]

  def index
    @builds = @project.builds.order('id desc').page(params[:page])

    respond_to do |format|
      format.html
      format.json { render json: @builds }
    end
  end

  def new
    @build = @project.builds.build
  end

  def create
    @build = @project.builds.build(new_build_params)
    @build.creator = current_user
    @build.save

    start_docker_build if @build.persisted? && params[:build_image].present?

    respond_to do |format|
      format.html do
        if @build.persisted?
          redirect_to [@project, @build]
        else
          render :new, status: 422
        end
      end

      format.json do
        render json: {}, status: @build.persisted? ? 200 : 422
      end
    end
  end

  def show
  end

  def edit
  end

  def update
    success = @build.update_attributes(edit_build_params)

    respond_to do |format|
      format.html do
        if success
          redirect_to [@project, @build]
        else
          render :edit, status: 422
        end
      end

      format.json do
        render json: {}, status: success ? 200 : 422
      end
    end
  end

  def build_docker_image
    start_docker_build

    respond_to do |format|
      format.html do
        redirect_to [@project, @build]
      end

      format.json do
        render json: {}, status: 200
      end
    end
  end

  private

  def find_build
    @build = Build.find(params[:id])
  end

  def new_build_params
    params.require(:build).permit(:git_ref, :label, :description)
  end

  def edit_build_params
    params.require(:build).permit(:label, :description)
  end

  def start_docker_build
    DockerBuilderService.new(@build).run!(push: true)
  end
end
