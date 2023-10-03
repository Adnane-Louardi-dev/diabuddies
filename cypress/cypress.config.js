const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "dkjy8r",
    chromeWebSecurity: false,
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 10000,
    video: false,
    numTestsKeptInMemory: 2,

    e2e: {
        testIsolation: false,
        baseUrl: "http://localhost:3001/",
        experimentalSessionAndOrigin: false,
    },

    blockHosts: ["*hotjar.com", "*hotjar.io", "*.png"],

    component: {
        devServer: {
            framework: "react",
            bundler: "webpack",
        },
    },
});
