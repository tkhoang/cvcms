/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LoginPage = __webpack_require__(1);
	var AppPage = __webpack_require__(3);

	var Admin = React.createClass({
		displayName: 'Admin',

		handleAuthSubmit: function handleAuthSubmit(auth) {
			console.log('handleAuthSubmit Page , nbTryAuth = ' + this.state.nbTryAuth);
			console.log('trying to auth = ' + auth.login + '/' + auth.password);
			if (auth.login.length > 3 && auth.password.length > 3) this.setState({ auth: true });else {
				var nbTryAuth = this.state.nbTryAuth + 1;
				this.setState({ auth: false, nbTryAuth: nbTryAuth });
			}
		},

		getInitialState: function getInitialState() {
			return { auth: false, nbTryAuth: 0 };
		},

		render: function render() {
			console.log('render this.state.nbTryAuth=' + this.state.nbTryAuth);
			if (!this.state.auth) {
				return React.createElement(LoginPage, {
					onAuthSubmit: this.handleAuthSubmit,
					nbTryAuth: this.state.nbTryAuth
				});
			} else {
				return React.createElement(AppPage, null);
			}
		}
	});

	var mountNode = document.getElementById('container');
	ReactDOM.render(React.createElement(Admin, null), mountNode);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LoginForm = __webpack_require__(2);

	var LoginPage = React.createClass({
			displayName: 'LoginPage',

			onAuthSubmit: function onAuthSubmit(auth) {
					console.log('onAuthSubmit LoginPage');
					console.log('trying to auth = ' + auth.login + '/' + auth.password);
			},

			render: function render() {
					return React.createElement(LoginForm, { onAuthSubmit: this.handleAuthSubmit });
			}
	});

	module.exports = LoginPage;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var Form = ReactBootstrap.Form;
	var FormGroup = ReactBootstrap.FormGroup;
	var Col = ReactBootstrap.Col;
	var Button = ReactBootstrap.Button;
	var ControlLabel = ReactBootstrap.ControlLabel;
	var FormControl = ReactBootstrap.FormControl;
	var Tooltip = ReactBootstrap.Tooltip;
	var Overlay = ReactBootstrap.Overlay;

	var LoginForm = React.createClass({
		displayName: 'LoginForm',

		getInitialState: function getInitialState() {
			return { login: '', password: '' };
		},
		handleLoginChange: function handleLoginChange(e) {
			this.setState({ login: e.target.value });
		},
		handlePasswordChange: function handlePasswordChange(e) {
			this.setState({ password: e.target.value });
		},
		secondTry: function secondTry(e) {
			console.log('secondTry');
			if (this.props.nbTryAuth > 0) {
				return 'error';
			} else {
				return '';
			}
		},
		handleSubmit: function handleSubmit(e) {
			e.preventDefault();
			console.log('handleSubmitButton');
			var login = this.state.login.trim();
			var password = this.state.password.trim();
			if (!login || !password) {
				return;
			}
			this.props.onAuthSubmit({ login: login, password: password });
		},
		render: function render() {
			var _this = this;

			console.log('render form nbTryAuth = ' + this.props.nbTryAuth);

			var tootTipProps = {
				show: this.props.nbTryAuth > 0,
				target: function target() {
					return ReactDOM.findDOMNode(_this.refs.submitButton);
				}
			};

			return React.createElement(
				Form,
				{ horizontal: true, onSubmit: this.handleSubmit },
				React.createElement(
					FormGroup,
					{ controlId: 'formHorizontalLogin', validationState: this.secondTry() },
					React.createElement(
						Col,
						{ componentClass: ControlLabel, sm: 2 },
						'Login'
					),
					React.createElement(
						Col,
						{ sm: 5 },
						React.createElement(FormControl, {
							type: 'text',
							placeholder: 'Email',
							onChange: this.handleLoginChange })
					)
				),
				React.createElement(
					FormGroup,
					{ controlId: 'formHorizontalPassword', validationState: this.secondTry() },
					React.createElement(
						Col,
						{ componentClass: ControlLabel, sm: 2 },
						'Password'
					),
					React.createElement(
						Col,
						{ sm: 5 },
						React.createElement(FormControl, {
							type: 'password',
							placeholder: 'Password',
							onChange: this.handlePasswordChange })
					)
				),
				React.createElement(
					FormGroup,
					null,
					React.createElement(
						Col,
						{ smOffset: 2, sm: 10 },
						React.createElement(
							Button,
							{ ref: 'submitButton', type: 'submit' },
							'Sign in'
						),
						React.createElement(
							Overlay,
							_extends({}, tootTipProps, { placement: 'right' }),
							React.createElement(
								Tooltip,
								{ id: 'overload-right', bsStyle: 'error' },
								React.createElement(
									'strong',
									null,
									'User/password not found!'
								)
							)
						)
					)
				)
			);
		}
	});

	module.exports = LoginForm;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var AppPage = React.createClass({
		displayName: "AppPage",

		render: function render() {
			return React.createElement(
				"div",
				null,
				"Logged in"
			);
		}

	});

	module.exports = AppPage;

/***/ }
/******/ ]);