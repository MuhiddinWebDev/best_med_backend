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
  return db.createTable("inspection_info_child2", {
    id:{
      type: 'int',
      primaryKey: true,
    },
    name:{
      type: 'string',
      notNull: true
    },
    info_child_id: {
      type: 'int'
    },
    code:{
      type: 'string',
      notNull: true
    }
  });
};

exports.down = function(db) {
  return db.dropTable("inspection_info_child2");
};

exports._meta = {
  "version": 1
};
