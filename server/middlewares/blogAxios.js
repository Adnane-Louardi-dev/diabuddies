const axios = require("axios")

const blogInstance = axios.create({
    baseURL: "http://localhost:1337",
    headers: {
        "Authorization": `Bearer 59464ecf26a26220dce43e3d8685013cdb01aa511e3a97c57a3849bdf86c7a2ed5beaf3a3873c0cfd8eaf10bdbb3aa911c34078e89ace97c0b86d625f0b9177a589364f6168f41973a741e97398ec1d5ca5ebce86664e4d6f81015f800965f63e47408a8c5c43c7f70a2e373c3d1886bf40bfc81bf4738051447c451e77fe9e7`
    }
})

const storeInstance = axios.create({
    baseURL: "https://api.chec.io/v1",
    headers: {
        "X-Authorization": "pk_311487a480376ac2466fecf26f4c95c96fea0103865da"
    }
})

module.exports = {blogInstance,storeInstance}