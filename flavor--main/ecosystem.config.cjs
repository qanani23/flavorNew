module.exports = {
  apps: [
    {
      name: "flavor-coffee-api",
      script: "./server/server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env_production: {
        NODE_ENV: "production",
        PORT: 3001,
        CLIENT_ORIGIN: "https://flavorcoffee.com",
      },
    },
  ],
};
