// src/routes/exampleRoutes.js

const express = require('express');
const router = express.Router();
const {postProcessController} = require('../controller/processController');

// Define API endpoint
router.post('/create-process', postProcessController)

module.exports = router;