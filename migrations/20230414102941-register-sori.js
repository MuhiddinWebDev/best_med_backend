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
  return db.createTable("register_sori", {
    id:{
      type: 'int',
      autoIncrement: true,
      primaryKey:true,
      notNull: true
    },
    date_time:{
      type: 'int',
      notNull: true
    },
    type: {
      type: 'int',
      notNull: true
    },
    price:{
      type: 'decimal',
      notNull: true
    },
    doc_id:{
      type: 'int',
      notNull: true
    },
    doc_type:{
      type: 'string'
    }
  });
};

exports.down = function(db) {
  return db.dropTable("register_sori");
};

exports._meta = {
  "version": 1
};
