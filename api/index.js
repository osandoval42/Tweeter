import express from 'express';
import merge from 'lodash/merge';
import SessionRouter from './routes/session_routes'
import FollowerRouter from './routes/follower_routes';

let router = express.Router();
router = merge(router, FollowerRouter);
router = merge(router, SessionRouter);



module.exports = router;