// src/routes/exampleRoutes.js

const express = require('express');
const router = express.Router();
const{ getAllprocessController} = require('../controller/processController');

// Define API endpoint
router.get('/get-all', getAllprocessController);
// router.post('/create-process', postProcessController)

module.exports = router;
