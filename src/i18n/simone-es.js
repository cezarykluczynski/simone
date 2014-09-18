/*!
 * Simone - Spanish localization file
 *
 * Copyright 2014 Piotr Jacobi <noctovision@gmail.com>
 * Version: @simone-main-version
 * Released under the MIT license.
 *
 * http://cezarykluczynski.github.io/simone/docs/index.html
 * http://cezarykluczynski.github.io/simone/docs/nonTechnicalContributions.html#translations
 */
;(function ( $ ) {
var langCode = "es";
$.simone.taskbar.prototype.options.localization[ langCode ] =
	$.simone.taskbar.prototype.options.localization[ langCode ] || {};
$.extend( true, $.simone.taskbar.prototype.options.localization[ langCode ], {
	alwaysOnTop: "Siempre al frente",
	code: langCode,
	clockDateFormat: "dd/mm/yy",
	clockTimeFormat: "HH:mm",
	clockAmSymbol: "AM",
	clockPmSymbol: "PM",
	close: "Cerrar",
	confirmCloseTitle: "Confirmación de cierre de “:title”",
	confirmCloseNo: "No",
	confirmCloseText: "¿Estás seguro de que quieres cerrar esta ventana?",
	confirmCloseYes: "Sí",
	languageSelect: "El idioma actual es español. Haz un click para cambiar",
	maximize: "Maximizar",
	minimize: "Minimizar",
	minimizeAll: "Minimizar todas las ventanas",
	multipleWindowButton: "(:counter) :title",
	name: "Español",
	networkMonitorOffline: "Este dispositivo parece estar desconectado de Internet",
	networkMonitorOnline: "Este dispositivo parece estar conectado a Internet",
	newWindow: "Ventana nueva",
	newWindowNext: "Ventana nueva (:counter)",
	restore: "Restaurar",
	slug: "ES",
	"startButton:start": "Inicio",
	toggleFullscreenEnter: "Entrar en modo de pantalla completa",
	toggleFullscreenLeave: "Salir de modo de pantalla completa",
});
})( jQuery );