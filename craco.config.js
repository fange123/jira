const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#fb6dc0",
              "@font-size-base": "18px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
