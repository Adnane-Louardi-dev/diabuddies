
const sum = (entries) => {
    return entries.reduce((a,b) => a+b,0)
}
const cartCalculationService = (entries)=>{
    return entries.reduce((entry1,entry2)=>({
        total: entry1.total + entry2.total,
        subtotal: entry1.subtotal + entry2.subtotal,
        discount: entry1.discount + entry2.discount,
        totalItems: entry1.totalItems + entry2.quantity,
    }),{
        total: 0,
        subtotal: 0,
        discount: 0,
        totalItems: 0,
    })
}

module.exports = {cartCalculationService}