let path = require("path");

module.exports = [
  { // 第一份生产环境的压缩代码
    mode: "production",
    entry: "./index.tsx", // 入口文件呀
    module: {
      rules: [ // ts loader
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        }
      ]
    },
    resolve: { // 解析文件呀
      extensions: [".tsx", ".ts", ".js"]
    },
    output: {
      path: path.join(__dirname, "build"),
      filename: "impr.min.js",
      library: "impr",
      libraryTarget: "commonjs-module"
    }
  }
];