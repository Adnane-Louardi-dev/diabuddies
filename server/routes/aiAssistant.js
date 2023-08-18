const express = require("express");
const router = express.Router();
const {isLoggedIn} = require("../middlewares/isLoggedIn");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


router.get("/connect",isLoggedIn,(req,res)=>{
    //IDK but we can return here a toker or somethig to give more security to the api
    res.status(201).send("you are succefully connected to the api")
})


router.post("/assistant",isLoggedIn,async (req,res)=>{
    const {userInputs} = req.body
    try {
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: `pretend that you're an excelent doctor in diabetec field and you're talking to a diabetec patient,
            keep your answers short but help the patient a lot, and don't answer any questions unrelated to diabetec.
             sometimes, suggest to people reading our blogs in the application or buying useful products that will help them with their diabetec .`
            }, ...userInputs
            ],
        });
        res.status(201).json({assistantOutput: chatCompletion.data.choices[0].message})
    } catch (e) {
        console.log(e)
        res.status(404).json({assistantOutput: "There was an errore with the api", ...e})
    }
})

module.exports = router