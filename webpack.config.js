module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: './',
      filename: 'bundle.js',
      clean: true,
    },
    entry: './src/index.js',
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic', // Позволяет НЕ писать import React from 'react'
                    development: isDev,   // Решает ошибку с jsxDEV на проде
                  },
                ],
              ],
            },
          },
        },
      ],
    },
    // ... остальные секции (plugins, devServer) без изменений ...
    devtool: isDev ? 'inline-source-map' : false,
  };
};
