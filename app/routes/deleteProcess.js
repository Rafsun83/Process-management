// src/routes/exampleRoutes.js

const express = require('express');
const router = express.Router();
const {deleteProcessController} = require('../controller/processController');

// Define API endpoint
router.delete('/delete-process/:pid', deleteProcessController)

module.exports = router;