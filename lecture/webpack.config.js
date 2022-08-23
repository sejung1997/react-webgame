const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "wordrelay",
  mode: "development", // 실서비스: production
  devtool: "eval", // 실서비스: hidden-source-map
  resolve: {
    extensions: [".js", ".jsx"],
  },
  // entry에 들어갈 확장자를 다 넣어줌
  entry: {
    app: ["./client"],
  }, // 입력
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 1% in KR"], // browserslist
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-refresh/babel",
          ],
        },
      },
    ],
  }, // INPUT => OUTPUT 할때 적용되는 규칙
  plugins: [new RefreshWebpackPlugin()],
  output: {
    path: path.join(__dirname, "dist"), //현재 폴더에 "dist" 라는 폴더를 만들어준다.
    filename: "app.js",
    // publicPath: "/dist/",
  }, //출력
  devServer: {
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};
