var bookshelf = require('./bookshelf');

var info = bookshelf.Model.extend({
  tableName: 'infos'
});

module.exports = info;
