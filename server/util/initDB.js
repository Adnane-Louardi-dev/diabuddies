const {levelsSchema} = require("../models/levelsSchema");
const {medicamentModel} = require("../models/medicamentSchema");


module.exports = {
    createLevels: async () => {
        const existedLevelsCount = await levelsSchema.countDocuments({});
        if (!existedLevelsCount) {
            const thirdLevel = await levelsSchema.create({
                levelName: "Third level",
                level: 3,
                minPoints: 100,
                maxPoints: 300,
            });
            const secondLevel = await levelsSchema.create({
                levelName: "Second level",
                level: 2,
                minPoints: 100,
                maxPoints: 300,
                nextLevel: thirdLevel._id,
            });
            const firstLevel = await levelsSchema.create({
                levelName: "First level",
                level: 1,
                minPoints: 0,
                maxPoints: 100,
                nextLevel: secondLevel._id,
            });
            await Promise.all([firstLevel.save(), secondLevel.save(), thirdLevel.save()]);
        }
    },
    initMedicament: async () => {
        const existedMedicament = await medicamentModel.exists({});
        console.log("existed", existedMedicament)
        if(!existedMedicament){
           const medicaments = await Promise.all([
               medicamentModel.create({name: "Product1"}),
               medicamentModel.create({name: "Product2"}),
               medicamentModel.create({name: "Product3"}),
           ])
            medicaments.map(async (medicament) => await medicament.save().then(()=>console.log("medicament created")))
        }
        console.log("medicament initiated")
    }
}
