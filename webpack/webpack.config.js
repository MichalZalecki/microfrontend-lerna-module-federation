require("dotenv").config({ silent: true });

const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const isDevelopment = process.env.NODE_ENV === "development";

function localIdentName() {
  if (process.env.NODE_ENV === "production") return "[hash:base64]";
  return "[path][name]__[local]";
}

module.exports = {
  entry: {
    app: [path.resolve("src/index.tsx")],
  },

  output: {
    path: path.resolve("build"),
    filename: "[name].[fullhash].js",
    chunkFilename: "[name].[contenthash].js",
    publicPath: "/",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },

  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new HTMLWebpackPlugin({
      template: path.resolve("src/index.html"),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: isDevelopment,
          rootMode: "upward",
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                localIdentName: localIdentName(),
              },
            },
          },
        ],
      },
    ],
  },
};
