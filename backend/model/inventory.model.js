const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema({
    title:{type:String, required:true},
    image:{type:String, required:true},
    scratches:{type:Number, required:true},
    odometer:{type:Number, required:true},
    registration_place:{type:String, required:true},
    original_paint:{type:String, required:true},
    description:{type:[String], required:true},
    reported_accident:{type:Number, required:true},
    previous_buyer:{type:Number, required:true},
    user:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    oem_spec:{type:mongoose.Schema.Types.ObjectId, ref:'oem_spec', required:true}
}, {versionKey:false});

const InventoryModel = mongoose.model('inventory', InventorySchema);

module.exports = {InventoryModel};
