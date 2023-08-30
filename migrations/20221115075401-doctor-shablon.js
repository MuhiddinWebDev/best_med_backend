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
  return db.createTable("shablon_doctor",{
    id:{
      type: 'int',
      autoIncrement: true,
      primaryKey: true,
      notNull: true
    },
    doctor_id:{
      type: 'int',
      notNull: true
    },
    name:{
      type: 'string'
    }
  });
};

exports.down = function(db) {
  return db.dropTable("shablon_doctor");
};

exports._meta = {
  "version": 1
};
