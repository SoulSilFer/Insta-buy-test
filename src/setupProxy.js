import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.instabuy.com.br',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/apiv3'
      }
    })
  );
}
