exports.up = function(db) {
    return db.runSql('ALTER TABLE settings MODIFY rules TEXT');
  };
  
  exports.down = function(db) {
    return db.runSql('ALTER TABLE settings MODIFY rules VARCHAR(255)');
  };
  