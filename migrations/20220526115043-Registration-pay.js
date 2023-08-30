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
  return db.createTable('registration_pay', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    user_id:{
      type: 'int'
    },
    discount:{
      type: 'decimal'
    },
    registration_id:{
      type: 'int'
    },
    pay_type:{
      type: 'string',
    },
    summa:{
      type: 'decimal',
      notNull: true
    },
    date_time:{
      type: 'int'
    },
    umumiy_sum:{
      type: 'decimal'
    },
    backlog:{
      type: 'decimal'
    },
    comment:{
      type: 'string'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('registration_pay');
};

exports._meta = {
  "version": 1
};
