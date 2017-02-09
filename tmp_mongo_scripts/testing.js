import User from '../models/user';
import config from '../config';
var mongoose = require('mongoose');
import es6Promise from 'es6-promise';
mongoose.Promise = es6Promise.Promise;

const db = config.configDB();
