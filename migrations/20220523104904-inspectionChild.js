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
  return db.createTable('inspectionChild', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    norm:{
      type: 'string',
    },
    parent_id:{
      type: 'int'
    },
    price:{
      type: 'decimal',
      notNull: true
    },
    citizen_price:{
      type: 'decimal'
    },
    name:{
      type: 'string',
      notNull: true
    },
    file:{
       type: 'string',
       notNull: true
    }
  });
};

exports.down = function(db) {
  return db.dropTable('inspectionChild');
};

exports._meta = {
  "version": 1
};
