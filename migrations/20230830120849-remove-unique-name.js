'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.removeIndex('settings', 'name', callback);
};

exports.down = function(db, callback) {
  db.addIndex('settings', 'name', ['name'], true, callback);
};

exports._meta = {
  "version": 1
};
