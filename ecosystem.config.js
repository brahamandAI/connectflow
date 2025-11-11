module.exports = {
  apps: [
    {
      name: 'connectflow',
      script: 'npm',
      args: 'start',
      cwd: '/home/ubuntu/htdocs/connectflow',
      instances: 1,
      autorestart: false,
      stop_exit_codes: '0',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3005
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z'
    }
  ]
};