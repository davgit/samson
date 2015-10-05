require 'samson/integration'

class WebhooksController < ApplicationController
  include ProjectLevelAuthorization

  before_action :authorize_project_deployer!

  def index
    @project = current_project
    @webhooks = @project.webhooks
    @sources = Samson::Integration.sources
  end

  def new
    @project = current_project
    @webhooks = @project.webhooks
  end

  def create
    @project = current_project
    @project.webhooks.create!(webhook_params)

    redirect_to project_webhooks_path(@project)
  end

  def destroy
    @project = current_project
    webhook = @project.webhooks.find(params[:id])
    webhook.soft_delete!

    redirect_to project_webhooks_path(@project)
  end

  def show
    @project = current_project
    @webhook = @project.webhooks.find(params[:id])
  end

  private

  def webhook_params
    params.require(:webhook).permit(:branch, :stage_id, :source)
  end

end
