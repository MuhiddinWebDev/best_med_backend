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
  return db.createTable("register_mkb", {
    id:{
      type: 'int',
      notNull: true,
      autoIncrement: true,
      primaryKey: true
    },
    mkb_id:{
      type: 'int',
      notNull: true
    },
    name: {
      type: 'string',
      notNull: true
    },
    datetime:{
      type: 'int',
      notNull: true
    },
    registration_id:{
      type: 'int',
      notNull: true
    },
    patient_id:{
      type: 'int',
      notNull: true
    },
    doctor_id:{
      type: 'int',
      notNull: true
    },
    filial_id:{
      type: 'int'
    }
  });
};

exports.down = function(db) {
  return db.dropTable("register_mkb");
};

exports._meta = {
  "version": 1
};
