const express = require('express');
const categoryController = require('../controllers/categoryController');
const categoryRouter = express.Router();
const isAuth = require('../middlewares/isAuth');

//!Add
categoryRouter.post('/api/v1/categories/create', isAuth,  categoryController.create);

//!lists
categoryRouter.get('/api/v1/categories/lists' , isAuth , categoryController.lists);

//!Update 
categoryRouter.put('/api/v1/categories/update/:id', isAuth, categoryController.update);

//!delete
categoryRouter.delete('/api/v1/categories/delete/:id', isAuth, categoryController.delete);

module.exports = categoryRouter;