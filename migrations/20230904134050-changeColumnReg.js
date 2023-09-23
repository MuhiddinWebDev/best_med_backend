exports.up = function(db) {
  return db.runSql('ALTER TABLE registration_arxiv MODIFY complaint TEXT');
};

exports.down = function(db) {
  return db.runSql('ALTER TABLE registration_arxiv MODIFY complaint VARCHAR(255)');
};
