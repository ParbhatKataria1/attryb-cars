function aggregation({page, limit, max_mileage, min_mileage, max_price, min_price, sortvalue, color, search}){
    return [
        {
            $lookup:{from:'oem_specs', localField:'oem_spec', foreignField:'_id', as:'oem'}
        },
        {
            $sort:{'oem.price':+sortvalue}
        },
        {
            $skip:(page-1)*(+limit)
        },
        {
            $limit:+limit
        },
        {
            $match:{'oem.price':{$lte:+max_price, $gte:+min_price}, 'oem.mileage':{$lte:+max_mileage, $gte:+min_mileage}, 'oem.model':search, 'oem.color':{$in:[color]}}
        }
    ]
}

module.exports = {aggregation}