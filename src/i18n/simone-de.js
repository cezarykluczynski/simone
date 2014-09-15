/*!
 * Simone - German localization file
 *
 * Copyright 2014 Bernhard Essl <bernhardessl@gmail.com>
 * Version: @simone-main-version
 * Released under the MIT license.
 *
 * http://cezarykluczynski.github.io/simone/docs/index.html
 * http://cezarykluczynski.github.io/simone/docs/nonTechnicalContributions.html#translations
 */
;(function ( $ ) {
var langCode = "de";
$.simone.taskbar.prototype.options.localization[ langCode ] =
	$.simone.taskbar.prototype.options.localization[ langCode ] || {};
$.extend( true, $.simone.taskbar.prototype.options.localization[ langCode ], {
	alwaysOnTop: "Immer oben",
	code: langCode,
	clockDateFormat: "DD, d MM, yy",
	clockTimeFormat: "HH:mm",
	clockAmSymbol: "AM",
	clockPmSymbol: "PM",
	close: "Schließen",
	confirmCloseTitle: "Schließen von “:title” bestätigen",
	confirmCloseNo: "Nein",
	confirmCloseText: "Wollen sie wirklich das Fenster schließen?",
	confirmCloseYes: "Ja",
	languageSelect: "Englisch ist die aktuelle Sprache. Klicken um sie zu ändern",
	maximize: "Maximieren",
	minimize: "Minimieren",
	minimizeAll: "Alle Fenster minimieren",
	multipleWindowButton: "(:counter) :title",
	name: "Deutsch",
	networkMonitorOffline: "Das Gerät scheint nicht mit dem Web verbunden zu sein",
	networkMonitorOnline: "Das Gerät scheint mit dem Web verbunden zu sein",
	newWindow: "Neues Fenster",
	newWindowNext: "Neues Fenster (:counter)",
	restore: "Wiederherstellen",
	slug: "DE",
	"startButton:start": "Start",
	toggleFullscreenEnter: "Vollbildschirmansicht aktivieren",
	toggleFullscreenLeave: "Vollbildschirmansicht beenden",
});
})( jQuery );
