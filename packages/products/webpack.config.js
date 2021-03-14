const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { config, withPreviews } = require("../../webpack/webpack.mfe.config");

module.exports = withPreviews({
  ...config,

  plugins: [
    new ModuleFederationPlugin({
      name: "app_products",
      library: { type: "var", name: "app_products" },
      filename: "productsRemoteEntry.js",
      exposes: {
        "./ProductsPage": "./src/ProductsPage",
      },
      remotes: {
        app_billing: "app_billing",
      },
      // shared: [{ react: { singleton: true }, "react-dom": { singleton: true } }],
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
});
