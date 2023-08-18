const axios = require("axios");

const strapiInstance = axios.create({
  baseURL: "http://localhost:1337",
  headers: {
    Authorization: `Bearer 2469c245c1e9f7522343b9e8fa4c6acad534ead497f8667a2f4e26509d08458bdfc7a4792d953c76ffcaa2c892c581c387a129ce068de7e51cf23f80f2bbacca823b21c579f67e32c5b8647e7b549fe1f20691a80e98c2d1d8eda3748d1127e785e1bccb6148020f79244d2e649efda4a89ef23d6e45bb3d6ab89a09cd86e505`,
  },
});

const storeInstance = axios.create({
  baseURL: "https://api.chec.io/v1",
  headers: {
    "X-Authorization": "pk_311487a480376ac2466fecf26f4c95c96fea0103865da",
  },
});

module.exports = { strapiInstance, storeInstance };
