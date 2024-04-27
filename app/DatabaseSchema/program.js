const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    PID: {type: String, required: true, unique: true},
    Creation_time: [{type: String}]
    // {type: String, required: true, unique: true}
});
// programSchema.set('id', false)
// programSchema.virtual('id').get(function(){
//     return this.PID;
// })
module.exports = {programSchema}