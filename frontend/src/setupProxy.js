const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://16.171.145.223:3000', 
      changeOrigin: true,
    })
  );
};
