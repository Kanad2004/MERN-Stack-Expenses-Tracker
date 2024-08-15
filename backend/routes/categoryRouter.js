const express = require('express');
const categoryController = require('../controllers/categoryController');
const categoryRouter = express.Router();
const isAuth = require('../middlewares/isAuth');

//!Add
categoryRouter.post('/api/v1/categories/create', isAuth,  categoryController.create);

//!lists
categoryRouter.get('/api/v1/categories/lists' , isAuth , categoryController.lists);

module.exports = categoryRouter;