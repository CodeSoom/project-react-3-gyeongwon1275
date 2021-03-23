const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: path.resolve(__dirname, 'src/index.jsx'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
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
};
