var
	i18n 			= require("i18n");

exports.getAdmin = function (req, res) {
	i18n.setLocale('en');
    res.render('admin', params);
}