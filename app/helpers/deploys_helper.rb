require 'coderay'

module DeploysHelper
  def deploy_active?
    @deploy.active? && (JobExecution.find_by_id(@deploy.job_id) || JobExecution.enabled)
  end

  def deploy_page_title
    "#{@deploy.stage.name} deploy (#{@deploy.status}) - #{@project.name}"
  end

  def deploy_notification
    "Samson deploy finished:\n#{@project.name} / #{@deploy.stage.name} #{@deploy.status}"
  end

  def file_status_label(status)
    mapping = {
      "added"    => "success",
      "modified" => "info",
      "removed"  => "danger"
    }

    type = mapping[status]

    content_tag :span, status[0].upcase, class: "label label-#{type}"
  end

  def file_changes_label(count, type)
    content_tag :span, count.to_s, class: "label label-#{type}" unless count.zero?
  end

  def github_users(users)
    users.map {|user| github_user_avatar(user) }.join(" ").html_safe
  end

  def github_user_avatar(user)
    return if user.nil?

    link_to user.url, title: user.login do
      image_tag user.avatar_url, width: 20, height: 20
    end
  end

  def buddy_check_button(project, deploy)
    return nil unless deploy.waiting_for_buddy?

    button_class = ['btn']

    if @deploy.started_by?(current_user)
      button_text = 'Bypass'
      button_class << 'btn-danger'
    else
      button_text = 'Approve'
      button_class << 'btn-primary'
    end

    link_to button_text, buddy_check_project_deploy_path(@project, @deploy), method: :post, class: button_class.join(' ')
  end

  def syntax_highlight(code, language = :ruby)
    CodeRay.scan(code, language).html.html_safe
  end

  def stages_select_options
    @project.stages.unlocked_for(current_user).map do |stage|
      [stage.name, stage.id, 'data-confirmation' => stage.confirm?]
    end
  end

  def stop_button(deploy: @deploy, **options)
    return unless @project && deploy
    link_to 'Stop', [@project, deploy], options.merge(method: :delete, class: options.fetch(:class, 'btn btn-danger btn-xl'))
  end
end
