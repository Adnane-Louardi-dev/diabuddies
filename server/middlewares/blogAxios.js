const axios = require("axios");

const strapiInstance = axios.create({
  baseURL: "http://10.56.1.17:1337",
  headers: {
    Authorization: `Bearer ${process.env.STRAPI}`,
  },
});

module.exports = { strapiInstance };
