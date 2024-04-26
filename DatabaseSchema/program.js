const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    PID: Number,
    Creation_time: [{type: String}]
});
module.exports = {programSchema}