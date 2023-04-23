const express = require('express');

const usersRouter = require('./users.router');
const categoriesRouter = require('./category.router');
const partnessRouter = require('./partness.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/category', categoriesRouter);
  router.use('/partness', partnessRouter);

}

module.exports = routerApi;
