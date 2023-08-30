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
  return db.createTable("pastavchik_pay", {
    id:{
      type: 'int',
      autoIncrement: true,
      primaryKey:true,
      notNull: true
    },
    type:{
      type: 'boolean',
      notNull: true
    },
    pastavchik_id:{
      type: 'int',
      notNull: true
    },
    price:{
      type: 'decimal',
      notNull: true
    },
    backlog:{
      type: 'decimal'
    },
    jami_summa:{
      type: 'decimal'
    },
    date_time:{
      type: 'int',
      notNull: true
    }
  });
};

exports.down = function(db) {
  return db.dropTable("pastavchik_pay");
};

exports._meta = {
  "version": 1
};
