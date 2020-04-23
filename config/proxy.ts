/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
  //   '/api/attendRule': {
  //     target: 'http://localhost:8284',
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
  //   '/api/attendItem': {
  //     target: 'http://localhost:8284',
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
  //   '/api/teacher': {
  //     target: 'http://localhost:8284',
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  // },
  //   '/api/user': {
  //     target: 'http://localhost:8284',
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
  //   '/api/student': {
  //     target: 'http://localhost:8284',
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
  //   '/api/classes': {
  //     target: 'http://localhost:8284',
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
  //   '/api/courseTable': {
  //     target: 'http://localhost:8284',
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
    '/api': {
      target: 'http://localhost:8284',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  test: {
    '/api/': {
    target: 'http://localhost:8284',
    changeOrigin: true,
    pathRewrite: { '^': '' },
  },
},
pre: {
    '/api/': {
      target: 'http://localhost:8284',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
