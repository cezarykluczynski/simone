/*!
 * Simone - English localization file
 *
 * Copyright 2014 Cezary Kluczyński
 * Version: @simone-main-version
 * Released under the MIT license.
 *
 * http://cezarykluczynski.github.io/simone/docs/index.html
 * http://cezarykluczynski.github.io/simone/docs/nonTechnicalContributions.html#translations
 */
;(function ( $ ) {
var langCode = "en";
$.simone.taskbar.prototype.options.localization[ langCode ] =
	$.simone.taskbar.prototype.options.localization[ langCode ] || {};
$.extend( true, $.simone.taskbar.prototype.options.localization[ langCode ], {
	alwaysOnTop: "Always on top",
	code: langCode,
	clockDateFormat: "DD, d MM, yy",
	clockTimeFormat: "HH:mm",
	clockAmSymbol: "AM",
	clockPmSymbol: "PM",
	close: "Close",
	confirmCloseTitle: "Confirm closing of “:title”",
	confirmCloseNo: "No",
	confirmCloseText: "Are you sure you want to close this window?",
	confirmCloseYes: "Yes",
	languageSelect: "Current language is English. Click to change",
	maximize: "Maximize",
	minimize: "Minimize",
	minimizeAll: "Minimize all windows",
	multipleWindowButton: "(:counter) :title",
	name: "English",
	networkMonitorOffline: "This device seems to be disconnected from the web",
	networkMonitorOnline: "This device seems to be connected to the web",
	newWindow: "New window",
	newWindowNext: "New window (:counter)",
	restore: "Restore",
	slug: "EN",
	"startButton:start": "Start",
	toggleFullscreenEnter: "Enter fullscreen mode",
	toggleFullscreenLeave: "Leave fullscreen mode",
});
})( jQuery );