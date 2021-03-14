const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { config } = require("../../webpack/webpack.mfe.config");

console.log(process.env.NODE_ENV);

module.exports = {
  ...config,

  entry: {
    index: "./src/index.jsx",
  },

  plugins: [
    ...config.plugins,
    new ModuleFederationPlugin({
      name: "app_shell",
      library: { type: "var", name: "app_shell" },
      remotes: {
        app_billing: "app_billing",
        app_products: "app_products",
      },
      shared: [
        {
          react: { eager: true, singleton: true },
          "react-dom": { eager: true, singleton: true },
          "react-router-dom": { eager: true, singleton: true },
        },
      ],
      // shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        withMultiRemotes: process.env.WITH_MULTI_REMOTES === "1",
      },
    }),
  ],
};
