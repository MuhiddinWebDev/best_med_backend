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
  return db.createTable('patient', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    fullname:{
      type: 'string',
      length: 300,
      notNull: true
    },
    name: {
      type: 'string',
      notNull: true
    },
    lastname: {
      type: 'string',
      length: 300,
      notNull: true
    },
    imtiyoz_type:{
      type: 'string',
      notNull: true
    },
    patronymic: {
      type: 'string',
            notNull: true
    },
    region_id:{
      type: 'int'
    },
    district_id:{
      type: 'int'
    },
    phone:{
      type: 'string',
      notNull: true
    },
    passport:{
      type: 'string'
    },
    addres:{
      type: 'string'
    },
    gender:{
      type: 'string',
      notNull: true
    },
    birthday:{
      type: 'string',
      notNull: true
    },
    citizen:{
      type: 'boolean',
      notNull: true
    },
    percent:{
      type: 'decimal'
    }
  })
};

exports.down = function(db) {
  return db.dropTable('patient');
};

exports._meta = {
  "version": 1
};
