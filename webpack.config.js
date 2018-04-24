const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  entry: path.resolve(__dirname, "src/index.js"),

  mode: "development",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",

        options: {
          presets: ["env"]
        }
      },
      {
        test: /\.(scss|css)$/,

        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        // If you see a file that ends in .html, send it to these loaders.
        test: /\.html$/,
        // This is an example of chained loaders in Webpack.
        // Chained loaders run last to first. So it will run
        // polymer-webpack-loader, and hand the output to
        // babel-loader. This let's us transpile JS in our `<script>` elements.
        use: [{ loader: "babel-loader" }, { loader: "polymer-webpack-loader" }]
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.ejs"),
      inject: false
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "bower_components/webcomponentsjs/*.js"),
        to: "bower_components/webcomponentsjs/[name].[ext]",
      },
      {
        from: path.resolve(__dirname, "src/assets/cats.json"),
        to: path.resolve(__dirname, "dist/assets/cats.json"),
      }
    ])
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "bower_components")
    ]
  }

  //   optimization: {
  //     splitChunks: {
  //       chunks: "async",
  //       minSize: 30000,
  //       minChunks: 1,
  //       name: true,

  //       cacheGroups: {
  //         vendors: {
  //           test: /[\\/]node_modules[\\/]/,
  //           priority: -10
  //         }
  //       }
  //     }
  //   }
};
