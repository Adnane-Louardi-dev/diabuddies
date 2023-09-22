import {stringify} from "qs"

module.exports =  {
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
    articleQuery: stringify({
        populate: {
            image: true,
            categories: true,
            author: {
                populate: ["avatar"]
            }
        }
    })}