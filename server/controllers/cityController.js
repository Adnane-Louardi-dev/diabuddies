const {strapiInstance} = require("../middlewares/blogAxios");
const {cityQuery} = require("../util/baseQueries");

const getCitiesAvailableForShipping = async (req,res) => {
    console.log('starting geeting cites')
    try {
        const citiesArray = await Promise.all([
            strapiInstance.get(`/api/cities?${cityQuery(0,100)}`)
                .then((res)=> res.data),
            strapiInstance.get(`/api/cities?${cityQuery(100,20)}`)
                .then((res)=> res.data)
        ])
        return res.status(200).json(citiesArray.flatMap(cities => cities.data))
    } catch (e) {
        console.error("cannot get cities",e.data)
        return res.status(404).json({message: "cannot get cities"})
    }
}


module.exports = {getCitiesAvailableForShipping}