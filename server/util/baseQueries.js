const {stringify} = require("qs");
const qs = require("qs");

// const cartQuery = stringify({
//     populate: {
//         venteEntries: {
//             product
//         }
//     }
// })



module.exports = {
    productQuery: stringify({
        populate: {
            pictures:true,
            thumbnail:true,
            inventory:true
        }
    }),
    orderQuery: stringify({
        populate: {
            vente_entries: {
                populate: {
                    product: {
                        populate: ["thumbnail"]
                    }
                }
            },
        }
    }),
    cityQuery: (start,limit) => {
        return stringify({
            pagination: {
                start: start,
                limit: limit
            }
        })
    },
    articleQuery: qs.stringify({
        populate: {
            image: true,
            categories: true,
            author: {
                populate: ["avatar"]
            }
        }
    }),
    recipeQuery: qs.stringify({
        populate: {
            image: true,
            recipe_categories: true
        }
    })
}