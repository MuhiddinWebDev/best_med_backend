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
  return db.createTable("register_bassen", {
    id:{
      type: 'int',
      notNull: true,
      autoIncrement: true,
      primaryKey: true
    },
    date_time:{
      type: 'int',
      notNull: true
    },
    type:{
      type: 'string'
    },
    price:{
      type: 'decimal',
      notNull: true
    },
    odam_soni:{
      type: 'decimal'
    },
    doc_type:{
      type: 'string'
    }
  });
};

exports.down = function(db) {
  return db.dropTable("register_bassen");
};

exports._meta = {
  "version": 1
};
