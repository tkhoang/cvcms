var
	i18n 			= require("i18n");

exports. getLogin = function (req, res) {
	i18n.setLocale('en');
	params = {
//	  		transactionID: req.oauth2.transactionID, 
	  		action: '/api/oauth2/authorize'
	  	};
    res.render('login', params);
}