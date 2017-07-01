var bookshelf = require('./bookshelf');

var keySkill = bookshelf.Model.extend({
  tableName: 'key_skills_values'
});

module.exports = keySkill;