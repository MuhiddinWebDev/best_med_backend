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
  return db.createTable('register_med_direct_arxiv', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    date_time:{
      type: 'int'
    },
    type:{
      type: 'int',
      notNull: true
    },
    price:{
      type: 'decimal'
    },
    doc_id:{
      type: 'int'
    },
    doc_type:{
      type: 'string'
    },
    comment:{
      type: 'string'
    },
    place:{
      type: 'string'
    },
    direct_id:{
      type: 'int'
    },
    filial_id:{
      type: 'int'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('register_med_direct_arxiv');
};

exports._meta = {
  "version": 1
};
