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
  return db.createTable('registration_doctor_arxiv', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    doctor_id:{
      type: 'int'
    },
    registration_id:{
      type: 'int'
    },
    status:{
      type: 'string',
      notNull: true,
    },
    price:{
      type: 'decimal',
      notNull: true
    },
    text:{
      type: 'string',
    },
    date_time:{
      type: 'int',
      notNull: true
    },
    filial_id:{
      type: 'int'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('registration_doctor_arxiv');
};

exports._meta = {
  "version": 1
};
