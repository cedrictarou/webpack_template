const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: resolve(__dirname, "src/javascripts/main.js"),
  output: {
    path: resolve(__dirname, "dist"),
    filename: "javascripts/main.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          // cssファイルとして別ファイルに出力する
          MiniCssExtractPlugin.loader,

          // cssをCommonJS形式に変換してjavaScriptで扱えるようにする
          "css-loader",
          {
            // PostCSSでcssを処理する
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                // ベンダープレフィックスを自動付与する
                plugins: [require("autoprefixer")({ grid: true })],
              },
            },
          },
          {
            // sassをコンパイルしてcssに変換する
            loader: "sass-loader",
            options: {
              // Dart Sassを使えるようにする
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: "image-webpack-loader",
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./stylesheets/main.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.pug",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/about.pug",
      filename: "about.html",
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    alias: {
      "@images": resolve(__dirname, "src/images/"),
      "@": resolve(__dirname, "src"),
    },
  },
  devtool: "source-map",
};
