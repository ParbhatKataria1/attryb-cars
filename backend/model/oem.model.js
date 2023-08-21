const mongoose  = require('mongoose');
const OemSchema = mongoose.Schema({
    model:{type:String, required:true},
    price:{type:Number, required:true},
    color:{type:[String], required:true},
    mileage:{type:Number, required:true},
    year:{type:Number, required:true},
    power:{type:Number, required:true},
    speed:{type:Number, required:true},
}, {versionKey:false});

const OemModel = mongoose.model('oem_spec', OemSchema);
module.exports = {OemModel};
