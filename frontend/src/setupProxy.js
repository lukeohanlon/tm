const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://13.48.19.43:3000',
      changeOrigin: true,
      secure: false,
    })
  );
};