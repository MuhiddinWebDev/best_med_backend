exports.up = function(db) {
    return db.runSql('ALTER TABLE registration_arxiv MODIFY id INT NOT NULL');
  };
  
  exports.down = function(db) {
    return db.runSql('ALTER TABLE registration_arxiv MODIFY id INT NOT NULL AUTO_INCREMENT');
  };
  