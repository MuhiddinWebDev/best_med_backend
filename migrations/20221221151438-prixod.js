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
  return db.createTable("prixod", {
    id: {
      type: 'int',
      autoIncrement: true,
      primaryKey: true,
      notNull: true
    },
    date_time:{
      type: 'int',
      notNull: true
    },
    pastavchik_id:{
      type: 'int',
      notNull: true
    },
    umumiy_summa:{
      type: 'decimal',
      notNull: true
    },
    comment:{
      type: 'string'
    }
  });
};

exports.down = function(db) {
  return db.dropTable("prixod");
};

exports._meta = {
  "version": 1
};
