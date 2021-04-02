const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => ({
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: path.resolve(__dirname, 'src/index.jsx'),
  plugins: [new Dotenv({ path: `./.env.${env.NODE_ENV}` })],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|__tests__|__mocks__)/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        loader: 'less-loader',
      },
    ],
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    hot: true,
    port: 1275,
  },
});
