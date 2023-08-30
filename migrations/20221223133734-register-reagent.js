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
  return db.createTable("register_reagent", {
    id:{
      type: 'int',
      autoIncrement: true,
      primaryKey: true,
      notNull: true
    },
    reagent_id:{
      type: 'int',
      notNull: true
    },
    date_time:{
      type: 'int',
      notNull: true
    },
    price:{
      type: 'decimal',
      notNull: true
    },
    count:{
      type: 'decimal'
    },
    summa:{
      type: 'decimal'
    },
    doc_id:{
      type: 'int'
    },
    doc_type:{
      type: 'string'
    }
  });
};

exports.down = function(db) {
  return db.dropTable("register_reagent");
};

exports._meta = {
  "version": 1
};
