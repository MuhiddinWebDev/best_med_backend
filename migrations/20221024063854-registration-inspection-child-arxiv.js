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
  return db.createTable('registration_inspection_child_arxiv', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    parent_id:{
      type: 'int'
    },
    text:{
      type: 'string',
    },
    norm:{
      type: 'string',
    },
    name:{
      type: 'string',
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
    checked:{
      type: 'boolean',
    },
    file:{
      type: 'string',
      length: 100
    }
  });
};

exports.down = function(db) {
  return db.dropTable('registration_inspection_child_arxiv');
};

exports._meta = {
  "version": 1
};
