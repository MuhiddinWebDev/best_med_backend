'use strict';

var dbm;
var type;
var seed;
const sequelize = require('../src/db/db-sequelize')
/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function() {
  return sequelize.query(
   "INSERT INTO `region` (`id`, `name`) VALUES \
   (1, 'Qoraqalpog‘iston Respublikasi'),\
   (2, 'Andijon viloyati'),\
   (3, 'Buxoro viloyati'),\
   (4, 'Jizzax viloyati'),\
   (5, 'Qashqadaryo viloyati'),\
   (6, 'Navoiy viloyati'),\
   (7, 'Namangan viloyati'),\
   (8, 'Samarqand viloyati'),\
   (9, 'Surxandaryo viloyati'),\
   (10, 'Sirdaryo viloyati'),\
   (11, 'Toshkent viloyati'),\
   (12, 'Farg‘ona viloyati'),\
   (13, 'Xorazm viloyati'),\
   (14, 'Toshkent shahri')"
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
