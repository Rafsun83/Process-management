// src/routes/exampleRoutes.js

const express = require('express');
const router = express.Router();
const {getSingleProcessController} = require('../controller/processController');

// Define API endpoint
router.get('/get-single/:pid', getSingleProcessController)

module.exports = router;