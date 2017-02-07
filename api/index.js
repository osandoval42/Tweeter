import express from 'express';
import merge from 'lodash/merge';
import SessionRoutesConfig from './routes/session_routes'
import FollowerRoutesConfig from './routes/follower_routes';

let router = express.Router();
SessionRoutesConfig(router);
FollowerRoutesConfig(router);



module.exports = router;