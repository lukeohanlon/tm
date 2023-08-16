const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://medminer.site',
      changeOrigin: true,
      secure: false,
    })
  );
};