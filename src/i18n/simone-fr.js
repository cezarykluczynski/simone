/*!
 * Simone - French localization file
 *
 * Copyright 2014 Badulesia <badulesia.granieri@gmail.com>
 * Version: @simone-main-version
 * Released under the MIT license.
 *
 * http://cezarykluczynski.github.io/simone/docs/index.html
 * http://cezarykluczynski.github.io/simone/docs/nonTechnicalContributions.html#translations
 */
;(function ( $ ) {
var langCode = "fr";
$.simone.taskbar.prototype.options.localization[ langCode ] =
	$.simone.taskbar.prototype.options.localization[ langCode ] || {};
$.extend( true, $.simone.taskbar.prototype.options.localization[ langCode ], {
	alwaysOnTop: "Toujours dessus",
	code: langCode,
	clockDateFormat: "DD, d MM, yy",
	clockTimeFormat: "HH:mm",
	clockAmSymbol: "AM",
	clockPmSymbol: "PM",
	close: "Fermer",
	confirmCloseTitle: "Confirmer la fermeture de “:title”",
	confirmCloseNo: "Non",
	confirmCloseText: "Etes-vous sûr(e) de vouloir fermer cette fenêtre ?",
	confirmCloseYes: "Oui",
	languageSelect: "La langue actuelle est le français. Cliquer pour changer",
	maximize: "Maximiser",
	minimize: "Minimiser",
	minimizeAll: "Minimiser toutes les fenêtres",
	multipleWindowButton: "(:counter) :title",
	name: "Français",
	networkMonitorOffline: "Cet ordinateur semble déconnecté du web",
	networkMonitorOnline: "Cet ordinateur semble connecté au web",
	newWindow: "Nouvelle fenêtre",
	newWindowNext: "Nouvelle fenêtre (:counter)",
	restore: "Restaurer",
	slug: "FR",
	"startButton:start": "Démarrer",
	toggleFullscreenEnter: "Passer en mode plein écran",
	toggleFullscreenLeave: "Quitter le mode plein écran",
});
})( jQuery );