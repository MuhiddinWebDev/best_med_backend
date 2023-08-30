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
  return db.createTable("Doctor_template", {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    doctor_id:{
      type: 'int',
      notNull: true
    },
    complaint:{
      type: 'string',
      notNull: true
    },
     name:{
       type: 'string',
       notNull: true
     },
     medical_history:{
       type: 'string',
       notNull: true
     },
     objective_vision:{
       type: 'string',
       notNull: true
     },
     instrumental:{
       type: 'string',
       notNull: true
     },
     diagnos:{
       type: 'string',
       notNull: true
     },
     procedure:{
       type: 'string'
     },
    recommended:{
      type: 'string'
    },
    concomitant:{
      type: 'string',
    }
  });
};

exports.down = function(db) {
  return db.dropTable('Doctor_template');
};

exports._meta = {
  "version": 1
};
