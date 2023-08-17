const {stringify} = require("qs");
const productQuery = stringify({
    populate: {
        pictures:true,
        thumbnail:true,
        inventory:true
    }
})

const orderQuery = stringify({
    populate: {
      vente_entries: {
          populate: {
              product: {
                  populate: ["thumbnail"]
              }
          }
      },
    }
})

const cityQuery = (start,limit) => {
    return stringify({
        pagination: {
            start: start,
            limit: limit
        }
    })
}
// const cartQuery = stringify({
//     populate: {
//         venteEntries: {
//             product
//         }
//     }
// })



module.exports = {productQuery, orderQuery, cityQuery}