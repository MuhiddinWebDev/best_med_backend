'use strict';

var dbm;
var type;
var seed;
const sequelize = require('../src/db/db-sequelize')
/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

let date1 = Math.floor(new Date().getTime() / 1000)
let date2 = Math.floor(new Date().getTime() / 1000) + (86400 * 7 * 4)

exports.up = function() {
    return sequelize.query(`
    INSERT INTO \`settings\` (\`id\`, \`name\`, \`date1\`, \`date2\`, \`quote\`, \`header_left\`, \`header_right\`) 
    VALUES (1, 'BEST MED', ${date1}, ${date2}, 'Quote text', 'Left header', 'Right header')
  `);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
