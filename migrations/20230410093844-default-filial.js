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
  return db.insert('filial', 
    ['name'], 
    ['Bosh filial']
  );
};

exports.down = function(db) {
    return db.delete('filial').where({name: 'Bosh filial'});
};

exports._meta = {
  "version": 1
};
