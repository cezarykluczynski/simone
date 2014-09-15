/* This is a template for localization file for Simone
   plugin. If you think you can help Simone by providing new
   localization, and the language you would like to provide is not yet supported
   (http://example.com/ - list of supported languages), please follow the
   instructions bellow. This instruction will tell you how to translate
   everything, it will provide you with the context of what you are
   translating, and later will tell you how to submit your translation
   to the project. No technical knowledge is required to do all of this.

   No auto-translation please. Ideally you would be a native speaker
   of language you would like to privide, but that not obligatory.

   If the language you would like to provide is already in the project,
   but you find that the translations are not good enough or outdated, please
   open an issue on Simone issue tracker:
   https://github.com/cezarykluczynski/simone/issues
   and provide the kind of information required to fix the problem, or make
   a pull request on GitHub:
   http://cezarykluczynski.github.io/simone/docs/code.html

   Edit the following line of comments - and don't remove it.
   Change LanuageName to an English name of file you're providing.
   Change "Contributor Name" to your name. You can provide your e-mail if
   you'd like to. If you cont, remove the email and the brackets completelly.
   If you don't want to use you real name, use a nickname.
   Keep rest of the comment as it is. */
/*!
 * Simone - LanguageName localization file
 *
 * Copyright 2014 Contibutor Name <optional@email.com>
 * Version: @simone-main-version
 * Released under the MIT license.
 *
 * http://cezarykluczynski.github.io/simone/docs/index.html
 * http://cezarykluczynski.github.io/simone/docs/nonTechnicalContributions.html#translations
 */
;(function ( $ ) {
/* Start by copying this file to new localization and renaming it.
   Now the file name is simone-template.js.
   It should be named simone-[language-code].js, where [language-code]
   is a language code of language you are providing,
   for instance "bg" for Bulgarian or "sv" for Swedish.

   Please use ISO 639-1 codes
   (http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes),
   or ISO 639-2 codes
   (http://en.wikipedia.org/wiki/List_of_ISO_639-2_codes)
   if the language you providing is not covered by ISO 639-1
   or ISO 693-2, ISO 693-3 languages
   (http://en.wikipedia.org/wiki/ISO_639-3)
   are welcomed too.

   Now the file name should be something like:
   simone-bg.js
   simone-sv.js
   or for ISO 639-2/ISO 693-3:
   simone-lun.js
   simone-nap.js

   Change "en" in next line to the language code you're providing,
   "pl" for example.

   If in any of text you find something like :title or :counter, copy this part
   intact - this is a place where appropriate value, for example a window title,
   will be inserted. */
var langCode = "en";
/* Leave next three lines as they are. */
$.simone.taskbar.prototype.options.localization[ langCode ] =
	$.simone.taskbar.prototype.options.localization[ langCode ] || {};
$.extend( true, $.simone.taskbar.prototype.options.localization[ langCode ], {
	/* This is a label for future use, for window's
	   "always on top" functionality */
	alwaysOnTop: "Always on top",

	/* Leave this line as it is */
	code: langCode,

	/* This is a date format that will be displayed in clock widget tooltip.
	   Use the standard format of country with the most speakers
	   of the language you're providing. This link can be helpful:
	   http://en.wikipedia.org/wiki/Date_format_by_country
	   Available formatting can be found here:
	   http://trentrichardson.com/examples/timepicker/#tp-formatting */
	clockDateFormat: "DD, d MM, yy",

	/* This is a time format that will be displayed in clock widget.
	   This link can be helpful:
	   http://en.wikipedia.org/wiki/Category:Date_and_time_representation_by_country
	   Available formatting can be found here:
	   http://trentrichardson.com/examples/timepicker/#tp-formatting */
	clockTimeFormat: "HH:mm",

	/* Clock a.m. symbol, where applicable */
	clockAmSymbol: "AM",

	/* Clock p.m. symbol, where applicable */
	clockPmSymbol: "PM",

	/* This text will be used as tooltip on window close button
	   and close button in window group menus */
	close: "Close",

	/* Header of confirm close window, displayed in it's titlebar.
	   If you think that having title in header does not sound good
	   in your language, you can place in in "confirmCloseText"
	   instead, but please have it in at least one of those two places. */
	confirmCloseTitle: "Confirm closing of “:title”",

	/* This is a text for confirm close window button,
	   denying the close action. */
	confirmCloseNo: "No",

	/* This is a text for confirm close window, being a longer version
	  of "confirmCloseTitle". You can use :title here just as it's used
	  in "confirmCloseTitle". */
	confirmCloseText: "Are you sure you want to close this window?",

	/* This is a text for confirm close window button,
	   confirming the close action. */
	confirmCloseYes: "Yes",

	/* This is a text that will be used as tooltip for language change
	   button. When editing, change the language name
	   to the name of language you are providing. */
	languageSelect: "Current language is English. Click to change",

	/* This text will be used as tooltip on window maximize button. */
	maximize: "Maximize",

	/* This text will be used as tooltip on window minimize button. */
	minimize: "Minimize",

	/* THis text will be used as tooltip on taskbar "minimize all" button */
	minimizeAll: "Minimize all windows",

	/* This text will be used as button label for window group buttons.
	   ":counter" accounts for a number of window in the group,
	   where ":title" is group name. Both values are replaced dynamically.
	   Fo most languages this can probably be left as it is. */
	multipleWindowButton: "(:counter) :title",

	/* This is a name of the current language, used in language select menu */
	name: "English",

	/* This text will be used as tooltip for network monitor button
	   for when connection status is defined as offline */
	networkMonitorOffline: "This device seems to be disconnected from the web",

	/* This text will be used as tooltip for network monitor button
	   for when connection status is defined as online */
	networkMonitorOnline: "This device seems to be connected to the web",

	/* This is a placeholder name for window create with no title specified */
	newWindow: "New window",

	/* This is a placeholder name for window create with no title specified,
	   when there are already a window of that type present. */
	newWindowNext: "New window (:counter)",

	/* This text will be used as tooltip on window restore button. */
	restore: "Restore",

	/* This text will be used as label of language change button when the
	   current language set is the language your are providing. */
	slug: "EN",

	/* This is the label for default start button */
	"startButton:start": "Start",

	/* This text will be used as tooltip for toggle fullscreen button
	   for when browser is not in fullscreen mode */
	toggleFullscreenEnter: "Enter fullscreen mode",

	/* This text will be used as tooltip for toggle fullscreen button
	   for when browser is in fullscreen mode */
	toggleFullscreenLeave: "Leave fullscreen mode",
});
})( jQuery );

/* When you done, remove all the comments other than the comment block
   on top of this file that contain author and file details.
   You have two options for submitting your work.
   You can either send this file to Simone's author or one
   of the maintainers listed here:
   http://cezarykluczynski.github.io/simone/docs/index.html
   or you can make a pull request on GitHub:
   http://cezarykluczynski.github.io/simone/docs/code.html */