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
  return db.addColumn('settings', 'header_left', { 
    type: 'varchar(250)',
    nullable: true,
    defaultValue: ''
  })
  .then(() => {
    return db.addColumn('settings', 'header_right', {
      type: 'varchar(250)',
      nullable: true,
      defaultValue: ''
    });
  });
};

exports.down = function(db) {
  return db.removeColumn('settings', 'header_left')
  .then(() => {
    return db.removeColumn('settings', 'header_right');
  });  
};

exports._meta = {
  "version": 1
};