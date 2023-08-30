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
  return db.createTable('inspection', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    name:{
      type: 'string',
      length: 300,
      notNull: true
    },
    parent_id:{
      type: 'int'
    },
    price:{
      type: 'decimal',
      notNull: true
    },
    citizen_price:{
      type: 'decimal',
      notNull: true
    },
    type:{
      type: 'boolean',
      notNull: true
    },
    user_id:{
      type: 'int'
    },
    category_id:{
      type: 'int'
    },
    percent_bonus:{
      type: 'int'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('inspection');
};

exports._meta = {
  "version": 1
};
