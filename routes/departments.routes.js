const express = require('express');
const DepartmentController = require('../controllers/departments.controller');
//const Department = require('../models/department.model');
const router = express.Router();

router.get('/departments', DepartmentController.getAll);

router.get('/departments/random', DepartmentController.getRandom);


router.get('/departments/:id', DepartmentController.getOne);

router.post('/departments', DepartmentController.addOne);

router.put('/departments/:id', DepartmentController.edit);

router.delete('/departments/:id', DepartmentController.delete);

module.exports = router;
