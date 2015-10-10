class SignalHandler
  def initialize
    @read, @write = IO.pipe
    Thread.new { run }
  end

  def signal
    @write.puts
  end

  def run
    IO.select([@read])

    if JobExecution.enabled
      # Disable new job execution
      JobExecution.enabled = false

      until JobExecution.active.empty? && MultiLock.locks.empty?
        puts "Waiting for jobs: #{JobExecution.active.map(&:id)}"
        sleep(5)
      end

      JobExecution.clear_registry

      puts "Passing SIGUSR2 on."

      # Pass USR2 to the underlying server
      Process.kill('SIGUSR2', $$)
    end
  end
end
