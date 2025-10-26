module.exports = {
  apps: [
    {
      name: 'connectflow',
      script: 'npm',
      args: 'start',
      cwd: '/home/connectflow/htdocs/www.connectflow.co.in/connectflow',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
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