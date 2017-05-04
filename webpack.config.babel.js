import path from 'path';
import webpack from 'webpack';
import px2rem from 'postcss-px2rem';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ReplacePlugin from 'replace-bundle-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import V8LazyParseWebpackPlugin from 'v8-lazy-parse-webpack-plugin';

const forBuild = process.env.NODE_ENV === "production";

const htmlTplPlugin = new HtmlWebpackPlugin({
  template: './index.ejs',
  title: 'Custom Title',
  minify: {
    collapseWhitespace: true,
    minifyJS: true,
    minifyCSS: true,
    removeComments: true
  }
});

const extractCssPlugin = new ExtractTextPlugin({
  filename: "[name].[contenthash:6].css",
  disable: !forBuild
});

const copyFilePlugin = new CopyWebpackPlugin([{
  from: './manifest.json',
  to: './'
}, {
  from: './favicon.ico',
  to: './'
}, {
  from: './assets',
  to: './assets'
}]);

const cleanPlugin = new CleanWebpackPlugin(['build'], {
  root: path.resolve(__dirname),
  verbose: true,
  dry: false
});

const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  output: {
    comments: false
  },
  compress: {
    warnings: false
  }
});

const devConfig = {
  port: process.env.PORT || 8080,
  host: '0.0.0.0',
  colors: true,
  compress: true,
  publicPath: '/',
  contentBase: './src',
  filename: 'app.js',
  historyApiFallback: true,
  proxy: {
    '/api': 'http://localhost:3000'
  }
};

const offlinePlugin = new OfflinePlugin({
  relativePaths: false,
  AppCache: false,
  excludes: ['_redirects'],
  ServiceWorker: {
    events: true
  },
  cacheMaps: [{
    match: /.*/,
    to: '/',
    requestTypes: ['navigate']
  }],
  publicPath: '/'
});

const hiddenErrorPlugin = new ReplacePlugin([{
  partten: /throw\s+(new\s+)?([a-zA-Z]+)?Error\s*\(/g, // partten: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
  replacement: () => 'return;('
}]);

const extractCssLoader = ExtractTextPlugin.extract({
  use: [{
    loader: "css-loader",
    options: {
      module: true
    }
  }, {
    loader: "postcss-loader"
  }, {
    loader: "less-loader"
  }],
  fallback: "style-loader"
});

const px2remOption = {
  plugins: () => {
    return [
      px2rem({
        remUnit: 20,
        remPrecision: 5
      }),
      autoprefixer
    ];
  }
};

const inlineCssloader = [{
  loader: "style-loader"
}, {
  loader: "css-loader",
  options: {
    module: true
  }
}, {
  loader: "postcss-loader",
  options: px2remOption
}, {
  loader: "resolve-url-loader",
  options: {
    sourceMap: true
  }
}, {
  loader: "less-loader"
}];

const extraCssloader = [{
  loader: "style-loader"
}, {
  loader: "css-loader"
}, {
  loader: "postcss-loader",
  options: px2remOption
}, {
  loader: "less-loader"
}];

const webpackPlugins = forBuild ?
  [
    cleanPlugin,
    copyFilePlugin,
    uglifyPlugin,
    hiddenErrorPlugin,
    offlinePlugin,
    extractCssPlugin,
    htmlTplPlugin
  ] :
  [
    new DashboardPlugin(),
    new V8LazyParseWebpackPlugin(),
    htmlTplPlugin
  ];

module.exports = {
  context: path.resolve(__dirname, "src"),

  entry: {
    app: "./index.js"
  },

  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "static/[name].[chunkhash:6].js"
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: ["node_modules"],
      use: ['babel-loader']
    }, {
      test: /\.(less|css)$/,
      include: [path.resolve(__dirname, 'src/components')],
      use: inlineCssloader
    }, {}, {
      test: /\.(less|css)$/,
      exclude: [path.resolve(__dirname, 'src/components')],
      use: extraCssloader
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.(xml|html|txt|md)$/,
      loader: 'raw-loader'
    }, {
      test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
      use: {
        loader: 'url-loader',
        options: {
          limit: 5120,
          name: 'static/[sha512:hash:base64:12].[ext]'
        }
      }
    }]
  },

  resolve: {
    extensions: [
      '.jsx', '.js', '.json'
    ],
    modules: [
      path.resolve(__dirname, "src"),
      'node_modules'
    ],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },

  plugins: webpackPlugins,

  devtool: 'source-map',

  target: "web",

  stats: {
    colors: true
  },

  devServer: devConfig
}
