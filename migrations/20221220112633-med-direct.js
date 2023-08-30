'use strict';

var dbm;
var type;
var seed;

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
  return db.createTable('med_direct', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    name:{
      type: 'string',
      length: 600,
      notNull: true
    },
    bonus:{
      type: 'decimal',
      notNull: true
    }
  })
};

exports.down = function(db) {
  return db.dropTable('med_direct');
};

exports._meta = {
  "version": 1
};
