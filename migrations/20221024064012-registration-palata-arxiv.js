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
  return db.createTable("registration_palata_arxiv", {
     id:{
      type: 'int',
      autoIncrement: true,
      primaryKey: true,
      notNull: true
     },
     palata_id:{
      type: 'int',
      notNull: true
     },
     registration_id:{
      type: 'int',
      notNull: true
     },
     price:{
      type: 'decimal',
      notNull: true
     },
     day:{
      type: 'int'
     },
     date_to:{
      type: 'int'
     },
     date_do:{
      type: 'int'
     },
     date_time:{
      type: 'int'
     },
     total_price:{
      type: 'decimal'
     }
  });
};

exports.down = function(db) {
  return db.dropTable("registration_palata_arxiv");
};

exports._meta = {
  "version": 1
};
