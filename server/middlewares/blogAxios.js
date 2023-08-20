const axios = require("axios");

const strapiInstance = axios.create({
  baseURL: "http://localhost:1337",
  headers: {
    Authorization: `Bearer f53f98a7901596797bc64e62aa4da4b23960c612`,
  },
});

const storeInstance = axios.create({
  baseURL: "https://api.chec.io/v1",
  headers: {
    "X-Authorization": "pk_311487a480376ac2466fecf26f4c95c96fea0103865da",
  },
});

module.exports = { strapiInstance, storeInstance };
