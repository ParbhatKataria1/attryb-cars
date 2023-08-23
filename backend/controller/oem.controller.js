const { OemModel } = require("../model/oem.model")

const get_oem = async (req, res)=>{
    try {
        const data = await OemModel.find();
        res.status(200).send({data});
    } catch (error) {
        res.status(500).send({error:'internal server error', msg:error?.message})
    }
}

const post_oem = async(req, res)=>{
    try {
        const data = req.body;
        const temp = await OemModel.insertMany(data);
        res.status(200).send({msg:'data is stored'});
    } catch (error) {
        res.status(500).send({error:'internal server error', msg:error?.message})
    }
}

module.exports = {get_oem, post_oem}