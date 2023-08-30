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
  return db.createTable("register_palata_arxiv", {
    id:{
      type: "int",
      autoIncrement: true,
      primaryKey: true,
      notNull: true
    },
    palata_id:{
      type: 'int',
    },
    registration_id:{
      type: 'int',
    },
    patient_id:{
      type: 'int',
    },
    price:{
      type: "int",
    },
    day:{
      type:"int"
    },
    date_to:{
      type: "int"
    },
    date_do:{
      type: "int"
    },
    date_time:{
      type: "int"
    }
  });
};

exports.down = function(db) {
  return db.dropTable("register_palata_arxiv");
};

exports._meta = {
  "version": 1
};
