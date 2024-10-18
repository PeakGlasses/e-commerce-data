/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { HotModuleReplacementPlugin, ProgressPlugin } = require("webpack");
module.exports = {
  mode: "development", // Faster build and better debugging in development
  entry: "./src/client/index.tsx", // Entry point of your app
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js", // Cached bundle naming for performance
    clean: true, // Clears output directory between builds
    publicPath: "",
  },
  devtool: "inline-source-map", // Enables better debugging in development
  devServer: {
    static: path.join(__dirname, "dist"),
    hot: true, // Enables hot module replacement
    open: false, // Automatically open browser after starting the server
    compress: true, // Enable gzip compression for faster load times
    port: 3000, // Local development server port
    historyApiFallback: true, // Ensures proper routing with react-router
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // Resolve these file types
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Transpile .ts/.tsx files
        use: "ts-loader",
        exclude: /node_modules/, // Exclude node_modules to speed up build
      },
      {
        test: /\.css$/, // Load CSS files
        use: ["style-loader", "css-loader"], // Injects CSS into the DOM
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Load images
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Template for the index.html
    }),
    new HotModuleReplacementPlugin(), // Enable hot module replacement
    new ProgressPlugin(),
  ],
  optimization: {
    runtimeChunk: "single", // Better long-term caching
    splitChunks: {
      chunks: "all", // Splits vendor code into separate chunks for faster build
    },
  },
};
