const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { config, withPreviews } = require("../../webpack/webpack.mfe.config");

module.exports = withPreviews((usePreviews) => ({
  ...config,

  plugins: [
    ...config.plugins,
    new ModuleFederationPlugin({
      name: "app_billing",
      library: { type: "var", name: "app_billing" },
      filename: "billingRemoteEntry.js",
      exposes: {
        "./BillingPage": "./src/BillingPage",
        "./UpsellModal": "./src/UpsellModal",
      },
      // make dependencies eager for preview to work
      shared: [
        {
          react: { eager: usePreviews, singleton: true },
          "react-dom": { eager: usePreviews, singleton: true },
          "react-router-dom": { eager: usePreviews, singleton: true },
        },
      ],
      // shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
}));
