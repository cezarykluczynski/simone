/*!
 * Simone - Polish localization file
 *
 * Copyright 2014 Cezary Kluczyński
 * Version: @simone-main-version
 * Released under the MIT license.
 *
 * http://cezarykluczynski.github.io/simone/docs/index.html
 * http://cezarykluczynski.github.io/simone/docs/nonTechnicalContributions.html#translations
 */
;(function ( $ ) {
var langCode = "pl";
$.simone.taskbar.prototype.options.localization[ langCode ] =
	$.simone.taskbar.prototype.options.localization[ langCode ] || {};
$.extend( true, $.simone.taskbar.prototype.options.localization[ langCode ], {
	alwaysOnTop: "Zawsze na wierzchu",
	code: langCode,
	clockDateFormat: "d MM yy, DD",
	clockTimeFormat: "h:mm",
	clockAmSymbol: "AM",
	clockPmSymbol: "PM",
	close: "Zamknij",
	confirmCloseTitle: "Potwierdź zamknięcie „:title”",
	confirmCloseNo: "Nie",
	confirmCloseText: "Czy na pewno chcesz zamknąć to okno?",
	confirmCloseYes: "Tak",
	languageSelect: "Obecny język to polski. Kliknij, aby zmienić język",
	maximize: "Maksymalizuj",
	minimize: "Minimalizuj",
	minimizeAll: "Minimalizuj wszystkie okna",
	multipleWindowButton: "(:counter) :title",
	name: "Polski",
	networkMonitorOnline: "To urządzenie wygląda na podłączone do sieci",
	networkMonitorOffline: "To urządzenie wygląda na odłączone od sieci",
	newWindow: "Nowe okno",
	newWindowNext: "Nowe okno (:counter)",
	restore: "Przywróć",
	slug: "PL",
	"startButton:start": "Start",
	toggleFullscreenEnter: "Włącz tryb pełnoekranowy",
	toggleFullscreenLeave: "Wyłącz tryb pełnoekranowy",
});
})( jQuery );