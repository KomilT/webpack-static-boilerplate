const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const { generateTemplatePlugins } = require("../lib/template-plugins");
const paths = require("./paths");

const templatePlugins = generateTemplatePlugins();

module.exports = {
  context: paths.src,
  entry: "./index.js",

  output: {
    path: paths.dist,
    publicPath: "",
  },

  module: {
    rules: [
      {
        // images
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: paths.icons,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
      {
        // svg sprite
        test: /\.svg$/i,
        include: paths.icons,
        loader: "svg-sprite-loader",
        options: {
          outputPath: "",
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          attributes: {
            root: paths.src,
          },
        },
      },
    ],
  },

  resolve: {
    alias: {
      "@lib": paths.lib,
    },
  },

  plugins: [
    new ESLintPlugin(),
    new SpriteLoaderPlugin(),

    new CopyPlugin({
      patterns: [
        {
          from: "assets/favicon",
          globOptions: {
            ignore: ["**/.gitkeep"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ].concat(templatePlugins),
};
