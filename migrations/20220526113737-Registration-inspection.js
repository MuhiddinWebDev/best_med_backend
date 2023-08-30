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
  return db.createTable('registration_inspection', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    inspection_id:{
      type: 'int'
    },
    user_id:{
      type: 'int'
    },
    registration_id:{
      type: 'int'
    },
    type:{
      type: 'int',
      notNull: true
    },
    price:{
      type: 'decimal',
      notNull: true
    },
    category_id:{
      type: 'int'
    },
    status:{
      type: 'string',
      notNull: true,
      length: 200
    },
    date_time:{
      type: 'string',
      notNull: true
    },
    skidka:{
      type : 'decimal'
    },
    filial_id:{
      type: 'int'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('registration_inspection');
};

exports._meta = {
  "version": 1
};
