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
   "INSERT INTO `inspection_info` (`id`, `code`, `name`) VALUES \
   (1,'H00-H06', 'Болезни век, слезных путей и глазницы'),\
   (2,'H10-H13', 'Болезни конъюнктивы'),\
   (3, 'H15-H22', 'Болезни склеры, роговицы, радужной оболочки и цилиарного тела'),\
   (4, 'H25-H28', 'Болезни хрусталика'),\
   (5, 'H50-H56', 'Болезни сосудистой оболочки и сетчатки'),\
   (6, 'H50-H52', 'Глаукома'),\
   (7, 'H53-H55', 'Болезни стекловидного тела и глазного яблока'),\
   (8, 'H56-H58', 'Болезни зрительного нерва и зрительных путей'),\
   (9, 'H59-H52', 'Болезни мышц глаза, нарушения содружественного движения глаз, аккомодации и рефракции'),\
   (10, 'H53-H54', 'Зрительные расстройства и слепота'),\
   (11, 'H55-H59', 'Другие болезни глаза и его придаточного аппарата')"
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
