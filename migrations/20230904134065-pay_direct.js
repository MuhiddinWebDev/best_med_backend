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
  return db.createTable("pay_direct", {
    id:{
      type: 'int',
      notNull: true,
      autoIncrement: true,
      primaryKey: true
    },
    datetime:{
      type: 'int',
      notNull: false
    },
    direct_id:{
      type: 'int',
      notNull: false
    },
    sum:{
        type: 'decimal',
        notNull: true
    },
    pay_type: {
        type: 'int',
        notNull: false
    },
    user_id: {
      type: 'int',
      notNull: false
    },
    backlog: {
      type: 'decimal',
      notNull: true,
    },
    filial_id: {
      type: 'int',
      notNull: true
    },
    comment: {
      type: 'string',
      notNull: true
    }
  });
};

// { id: 0, name: "Naqt" },
// { id: 1, name: "Plastik" }

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
