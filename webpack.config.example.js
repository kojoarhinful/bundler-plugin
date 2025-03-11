const path = require("path")
const ImageOptimizer = require("./dist/index.js").default

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    ImageOptimizer({
      quality: 75, // JPEG/WebP compression quality
      extensions: ["jpg", "jpeg", "png", "webp", "gif"],
      exclude: [/node_modules/],
      include: [/src\/assets/],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: "asset",
      },
    ],
  },
}

