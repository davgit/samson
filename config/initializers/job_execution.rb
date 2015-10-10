if !Rails.env.test? && !ENV['PRECOMPILE']
  if ENV['SERVER_MODE']
    Rails.application.config.after_initialize do
      JobExecution.enabled = true

      if Job.table_exists?
        Job.running.each(&:stop!)

        Job.non_deploy.pending.each do |job|
          JobExecution.start_job(job.commit, job)
        end
      end

      if Deploy.table_exists?
        Deploy.active.each do |deploy|
          next unless deploy.pending_non_production?
          deploy.pending_start!
        end
      end
    end
  end

  handler = SignalHandler.new

  Signal.trap('SIGUSR1') do
    handler.signal
  end
end
