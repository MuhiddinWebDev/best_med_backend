exports.up = function(db) {
    return db.runSql('ALTER TABLE registration MODIFY complaint TEXT');
  };
  
  exports.down = function(db) {
    return db.runSql('ALTER TABLE registration MODIFY complaint VARCHAR(255)');
  };
  