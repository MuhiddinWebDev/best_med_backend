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

/* Promise-based version */
exports.up = function (db) {
  return db.createTable('settings', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    name : {
      type: 'string',
      unique: true,
      length: 200,
      notNull: true
    },
    logo : {
      type: 'string',
      length: 200,
    },
    date1 : {
      type: 'int',
    },
    date2 : {
      type: 'int',
    },
    quote: {
      type: 'string',
      length: 200,
    }
  });
};

exports.down = function (db) {
  return db.dropTable('settings');
};

exports._meta = {
  "version": 1
};
