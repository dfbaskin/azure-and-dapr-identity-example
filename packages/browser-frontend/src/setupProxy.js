// Set up a proxy for API requests (when running in development mode)

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v1.0",
    createProxyMiddleware({
      target: "https://testing.local:31001",
      changeOrigin: true,
      secure: false,
    })
  );
};
