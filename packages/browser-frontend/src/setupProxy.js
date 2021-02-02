// Set up a proxy for API requests (when running in development mode)

// const { createProxyMiddleware } = require('http-proxy-middleware');

const appConfig = require("../../../app-config.json");

module.exports = function (app) {
  app.use(
    "/api/config/auth",
    (req, res) => {
      res.send(appConfig.authentication);
    }
    // createProxyMiddleware({
    //   target: 'http://localhost:5000',
    //   changeOrigin: true,
    // })
  );
};
