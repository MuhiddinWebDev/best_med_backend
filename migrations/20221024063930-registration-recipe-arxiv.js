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
  return db.createTable('registration_recipe_arxiv', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    registration_doctor_id:{
      type: 'int'
    },
    registration_id:{
      type: 'int'
    },
    pill_id:{
      type: 'int'
    },
    time:{
      type: 'int',
      notNull: true,
    },
    day:{
      type: 'int',
      notNull: true
    },
    comment:{
      type: 'string',
      notNull: true,
    },
    name: {
      type: 'string',
      notNull: true
    },
    filial_id:{
      type: 'int'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('registration_recipe_arxiv');
};

exports._meta = {
  "version": 1
};
