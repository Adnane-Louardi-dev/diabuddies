const axios = require("axios");

const strapiInstance = axios.create({
  baseURL: process.env.STRAPI_URL ?? "http://localhost:1337",
  headers: {
    Authorization: `Bearer ${process.env.STRAPI}`,
  },
});

module.exports = { strapiInstance };
