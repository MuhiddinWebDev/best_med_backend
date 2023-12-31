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

exports.up = function(db) {
  return db.insert('user', 
    ['user_name', 'password', `role`, `salary`, `filial_id`, `percent`], 
    ['Dasturchi', '$2a$08$V7QaTzXpi1QVUGqV4NnwAu//I5Pxu8OHZBCnVdyQtLLJEE7G/qOz.', `Admin`, '0', '1', '0']
  );
};

exports.down = function() {
  return null;
};

exports._meta = {
  "version": 1
};
