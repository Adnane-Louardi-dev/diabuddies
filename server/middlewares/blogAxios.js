const axios = require("axios");

const strapiInstance = axios.create({
  baseURL: "http://localhost:1337",
  headers: {
    Authorization: `Bearer 73126f30ff0d1e088f2c272f673dfc7b84f00126e363137f1c88ab9b83ee37b6f2e187a516f60b7800739e0e3325fda467a2ad1d42de599a1dc8b7bd227e2267da070c8dc1d1fa10149c8d027d9397badca1132c8a2304e28ffc0b51d3cbe11207c025106d9bfaca92b2cd780ee645841f54fabafd35e7692563cadbd9cfd593`,
  },
});

const storeInstance = axios.create({
  baseURL: "https://api.chec.io/v1",
  headers: {
    "X-Authorization": "pk_311487a480376ac2466fecf26f4c95c96fea0103865da",
  },
});

module.exports = { strapiInstance, storeInstance };
