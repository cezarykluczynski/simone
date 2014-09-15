/*!
 * Simone - Nederlands localization file
 *
 * Copyright 2014 Bert Hankes <info@a2hankes.nl>
 * Version: @simone-main-version
 * Released under the MIT license.
 *
 * http://cezarykluczynski.github.io/simone/docs/index.html
 * http://cezarykluczynski.github.io/simone/docs/nonTechnicalContributions.html#translations
 */
;(function ( $ ) {
var langCode = "nl";
$.simone.taskbar.prototype.options.localization[ langCode ] =
	$.simone.taskbar.prototype.options.localization[ langCode ] || {};
$.extend( true, $.simone.taskbar.prototype.options.localization[ langCode ], {
	alwaysOnTop: "Altijd op voorgrond",
	code: langCode,
	clockDateFormat: "DD, d MM yy",
	clockTimeFormat: "HH:mm",
	clockAmSymbol: "VM",
	clockPmSymbol: "NM",
	close: "Sluiten",
	confirmCloseTitle: "Bevestig het sluiten van “:title”",
	confirmCloseNo: "Nee",
	confirmCloseText: "Weet je zeker dat je dit venster wilt sluiten?",
	confirmCloseYes: "Ja",
	languageSelect: "Huidige taal is Nederlands. Klik om te wijzigen",
	maximize: "Maximaliseren",
	minimize: "Minimaliseren",
	minimizeAll: "Minimaliseer alle vensters",
	multipleWindowButton: "(:counter) :title",
	name: "Nederlands",
	networkMonitorOffline: "Dit apparaat lijkt geen connectie te hebben met het internet",
	networkMonitorOnline: "Dit apparaat lijkt connectie te hebben met het internet",
	newWindow: "Nieuw venster",
	newWindowNext: "Nieuw venster (:counter)",
	restore: "Vorig formaat",
	slug: "NL",
	"startButton:start": "Start",
	toggleFullscreenEnter: "Volledig scherm aan",
	toggleFullscreenLeave: "Volledig scherm uit",
});
})( jQuery );