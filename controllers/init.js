var i18n = require("i18n");

exports.getInit = function (req, res) {
	i18n.setLocale('en');
    res.render('init', params);
}
