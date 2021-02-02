// Set up a proxy for API requests (when running in development mode)

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:31003",
      changeOrigin: true,
    })
  );
};
