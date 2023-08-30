const express = require("express");
const app = express();
require('./startup/logging')();
require('./startup/db')();
const {port} = require('./startup/config');
require('./startup/routes')(app);
require('./controllers/admin-app/cron')()
app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));

module.exports = app;