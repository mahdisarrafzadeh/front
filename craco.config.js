const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1DA57A',
              '@border-radius-base': '25px',
              '@input-number-handler-active-bg': '#f4f4f4'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};