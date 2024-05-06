const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "remoteAngularApp",
    publicPath: "auto",
    //implement this to avoid error
    //Uncaught SyntaxError: Cannot use 'import.meta' outside a module - Nx Monorepo
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  module: {
    rules: [
      {
        test: /\.xml$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      // For remotes (please adjust)
      name: "remoteAngularApp",
      filename: "remoteEntry.js",
      exposes: {
        './AppModule': './/src/app/app.module.ts',
        './DriversComp': './/src/drivers.comp.ts'
      },
      shared: share({
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        ...sharedMappings.getDescriptors()
      })
    }),
    sharedMappings.getPlugin()
  ],
};
