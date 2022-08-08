const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.mongoURI;
db.employees = require("./employee.model.js")(mongoose);
module.exports = db;
