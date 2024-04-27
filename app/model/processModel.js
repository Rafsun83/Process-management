const mongoose = require('mongoose');
const { programSchema } = require('../DatabaseSchema/program');

exports.Program = mongoose.model('Program', programSchema);