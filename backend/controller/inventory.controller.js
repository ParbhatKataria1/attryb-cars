const { aggregation } = require("../aggregation");
const { InventoryModel } = require("../model/inventory.model")

const get_inventory = async(req, res)=>{
    try {
        let {page = 1, limit = 8, color = "", min_price = 0, max_price = Infinity, min_mileage = 0, max_mileage = Infinity, sortvalue = 1, search = ""} = req.body;
        search =  new RegExp(search, 'i');
        color = new RegExp(color, 'i')
        const length = await InventoryModel.count();
        const data = await InventoryModel.aggregate(aggregation({page, limit, max_mileage, min_mileage, max_price, min_price, sortvalue, color, search}));
        res.status(200).send({data, length, userId:req?.user?._id});
    } catch (error) {
        res.status(500).send({error:'internal server error', msg:error.message});
    }
}

const post_inventory = async(req, res)=>{
    try {
        const {title = '', image = '', scratches = '', odometer = '', registration_place = '', original_paint = '', description = '', reported_accident = '', previous_buyer = '', user = '', oem_spec = ''} = req.body;
        if(!title || !image || !scratches || !odometer || !registration_place || !original_paint || !description || !reported_accident || !previous_buyer || !user || !oem_spec){
            return res.status(400).send({error:'please provide all the details'})
        }
        req.body.user = req?.user?._id;
        const data = new InventoryModel(req.body);
        await data.save();
        res.status(200).send('data is saved')
    } catch (error) {
        res.status(500).send({error:'internal server error', msg:error.message});
    }
}


const update_inventory = async(req, res)=>{
    try {
        const {_id = '', user = ''} = req.body;
        if(!_id){
            return res.status(400).send({error:'Please provide the necessary data'});
        }
        if(user !=req.user?._id){
            return res.status(403).send({error:'you are not authorized to update the post'});
        }
        await InventoryModel.findByIdAndUpdate({_id}, req.body);
        res.status(200).send({msg:'data is updated'});
    } catch (error) {
        res.status(500).send({error:'internal server error', msg:error.message});
    }
}

const delete_inventory = async(req, res)=>{
    try {
        const {_id = '', user=''} = req.body;
        if(!_id){
            return res.status(400).send({error:'Please provide the necessary data'});
        }
        if(user !=req.user?._id){
            return res.status(403).send({error:'you are not authorized to delete the post'});
        }
        await InventoryModel.findByIdAndDelete({_id});
        res.status(200).send({msg:'data is deleted'});
    } catch (error) {
        res.status(500).send({error:'internal server error', msg:error.message});
    }
}




// const temp = async(req, res)=>{
//     try {
//         const data = await InventoryModel.insertMany(req.body);
//         res.status(200).send('data is saved')
//     } catch (error) {
//         res.status(500).send({error:'internal server error', msg:error.message});
//     }
// }

module.exports = {get_inventory, delete_inventory, update_inventory, post_inventory}