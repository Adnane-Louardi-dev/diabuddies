const login = require("./login");
const logbook = require("./logbook");
const userRoutes = require("./userRoutes");
const user = require("./user");
const charts = require("./charts");
const wishList = require("./wishList");
const order = require("./order");
const comments = require("./comments");
const store = require("./store");
const blog = require("./blog");
const aiAssistant = require("./aiAssistant");
const {gamifyRouter} = require("./gamify");


module.exports = {login,logbook, userRoutes, user, charts, wishList, order, comments, store, blog, aiAssistant, gamifyRouter}