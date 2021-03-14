const config = require("./webpack.config");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports.config = {
  ...config,

  entry: {},

  mode: process.env.NODE_ENV === "production" ? "production" : "development",

  devtool: process.env.NODE_ENV === "production" ? "source-map" : "inline-source-map",

  output: {
    ...config.output,
    publicPath: "auto",
  },

  devServer: {
    historyApiFallback: true,
  },

  plugins: [new webpack.EnvironmentPlugin(["NODE_ENV"])],

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false, // do not extract comments to the *.LICENSE.txt file
      }),
    ],
  },
};

module.exports.withPreviews = (config) => {
  const usePreviews = process.env.WITH_PREVIEWS === "1";
  const localConfig = typeof config === "function" ? config(usePreviews) : config;

  if (usePreviews) {
    console.log("generating previews");

    localConfig.plugins.push(
      new HtmlWebpackPlugin({
        template: "./src/previews/index.html",
      }),
    );

    localConfig.entry = {
      index: "./src/previews/index.jsx",
    };
  } else {
    console.log("Skipping previews");
  }

  return localConfig;
};
