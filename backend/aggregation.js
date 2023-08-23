function aggregation({page, limit, max_mileage, min_mileage, max_price, min_price, sortvalue, color, search}){
    let arr = [
        {
            $lookup:{from:'oem_specs', localField:'oem_spec', foreignField:'_id', as:'oem'}
        },
        {
            $match:{'oem.price':{$lte:+max_price, $gte:+min_price}, 'oem.mileage':{$lte:+max_mileage, $gte:+min_mileage}, 'oem.model':search}
        }
    ]
    if(color!=0){
        arr.push({
            $match:{'oem.color':{$all :color}}
        })
    }
    arr.push({$skip:(page-1)*(+limit)});
    arr.push({$limit:+limit},)
    return arr;
}

module.exports = {aggregation}