/* this file writes all available languages into separate <script> tags;
when more languages will be added to the project, it should be considered
to build all languages into single file and link that file instead;
this file is used internally by this repository and should not be taken
into your project - merge your desired language file
on the download page instead */

// make recognizable name, so other pages can use this variable
var availableSimoneLanguages = [ "de", "en", "es", "fr", "nl", "pl" ];

// some pages might only need the config
if ( typeof dontLoadLanguages === "undefined" || dontLoadLanguages !== true ) {
	for( var l = 0; l < availableSimoneLanguages.length; l++ ) {
		document.write(
			'<script src="' +
			( location.href.indexOf( "/docs/nonTechnical" ) === -1 ? '../' : '' ) +
			'../src/i18n/simone-' + availableSimoneLanguages[ l ] +
			'.js"></script>'
		);
	}
}