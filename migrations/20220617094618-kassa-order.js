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
  return db.createTable('kassa_order', {
    id:{
      type: 'int',
      autoIncrement: true,
      primaryKey: true,
      notNull: true
    },
    expense_id:{
      type: 'int',
      notNull: true
    },
    date_time:{
      type: 'string'
    },
    type:{
      type: 'string',
      notNull: true
    },
    pay_type:{
      type: 'string',
      notNull: true
    },
    price:{
      type: 'decimal',
      notNull: true
    },
    comment:{
      type: 'string'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('kassa_order');
};

exports._meta = {
  "version": 1
};
