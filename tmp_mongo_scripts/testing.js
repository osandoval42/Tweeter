import User from '../models/user';
import config from '../config';
var mongoose = require('mongoose');
import es6Promise from 'es6-promise';
mongoose.Promise = es6Promise.Promise;

const db = config.configDB();


// ,
//   "babel": {
//     "env": {
//       "production": {
//         "plugins": [
//           "transform-react-constant-elements",
//           "transform-react-inline-elements"
//         ]
//       }
//     }
//   }

  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env.NODE_ENV': JSON.stringify('production')
  //   }),
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   })
  // ],