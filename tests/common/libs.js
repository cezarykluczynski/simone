var libLoader = "";

/* this code will load proper version of jQuery and jQuery UI,
or the latest version used in project in no version is found in URL query */

// find query part
var search = location
	.search
	.substr( 1 )
	.split( "&" );

var query = {},
	queryPart, elem;

// parse query into object
for( var i in search ) {
	if ( search.hasOwnProperty( i ) && search[ i ] ) {
		// add to query object if key isn't empty
		queryPart = search[ i ].split( "=" );
		query[ queryPart [ 0 ] ] = queryPart[ 1 ];
	}
}

// libraries we test against;
// versions of those libraries are configured in tests/common/common.js
var libs = {
	"jquery"   : {
		js     : [
			"../../libs/jquery/{version}jquery.js",
		],
	},
	"jqueryUi": {
		js     : [
			"../../libs/jquery-ui/{version}jquery-ui.js",
			"../../libs/jquery-ui/{version}jquery-ui-i18n.js"
		],
		css    : [
			"../../libs/jquery-ui/{version}themes/sunny/jquery-ui.css"
		]
	}
};

// iterate over libs
for ( var i in libs ) {
	if ( libs.hasOwnProperty( i ) ) {
		// iterate over file types
		for ( var j in libs[ i ] ) {
			var lib = libs[ i ];

			if ( lib.hasOwnProperty( j ) ) {
				var urls = lib[ j ];

				// iterate over urls in library
				for ( var k in urls ) {
					if ( urls.hasOwnProperty( k ) ) {
						var url = urls[ k ];
						// replace {version} either by real version or empty string,
						// meaning latest version of library available in project
						// will be used
						url = url.replace( "{version}", query[ i ] ? query[ i ] + "/" : "" );

						if ( j === "js" ) {
							// add script
							libLoader += '<script src="' + url + '"></script>';
						}

						if ( j === "css" ) {
							// add stylesheet
							libLoader += '<link href="' + url + '" rel="stylesheet">';
						}
					}
				}
			}
		}
	}
}

var pageScriptTags  = document.getElementsByTagName( "script" ),
    isManualTest    = pageScriptTags[ pageScriptTags.length - 1 ].src.indexOf( "testType=manual" ) > -1;

if ( isManualTest ) {
document.write(
'<!-- libraries loaded dynamically according to QUnit settings -->' +
libLoader +
'<!-- end of libraries loaded dynamically -->' +

'<link href="../../src/simone.taskbar.css" rel="stylesheet">' +
'<link href="../../src/simone.window.css" rel="stylesheet">' +
'<link href="../common/common.css" rel="stylesheet">' +

'<script src="../../src/simone.taskbar.js"></script>' +
'<script src="../../src/simone.window.js"></script>' +
'<script src="../../src/i18n/simone-all.js"></script>' +
'<script src="../../libs/loremipsum/jquery.loremipsum.js"></script>' +

'<script src="../common/common.manual.js"></script>' +

'<!-- Foundation topbar -->' +
'<link href="../../libs/foundation/topbar/css/foundation.min.css" rel="stylesheet">' +
'<script src="../../libs/foundation/topbar/js/foundation.min.js"></script>' +
'<script src="../../docs/common/common.js"></script>'
);
} else {
document.write(
'<!-- libraries loaded dynamically according to QUnit settings -->' +
libLoader +
'<!-- end of libraries loaded dynamically -->' +

'<link href="../../libs/qunit/qunit.css" rel="stylesheet">' +
'<link href="../../src/simone.taskbar.css" rel="stylesheet">' +
'<link href="../../src/simone.window.css" rel="stylesheet">' +
'<link href="../common/common.css" rel="stylesheet">' +

'<script src="../../libs/qunit/jquery.simulate.js"></script>' +
'<script src="../../libs/qunit/qunit.js"></script>' +

'<script src="../../src/simone.taskbar.js"></script>' +
'<script src="../../src/simone.window.js"></script>' +
'<script src="../../src/i18n/simone-all.js"></script>' +

'<script src="../../libs/loremipsum/jquery.loremipsum.js"></script>' +

'<script src="../common/common.js"></script>' +

'<!-- Foundation topbar -->' +
'<link href="../../libs/foundation/topbar/css/foundation.min.css" rel="stylesheet">' +
'<script src="../../libs/foundation/topbar/js/foundation.min.js"></script>' +
'<script src="../../docs/common/common.js"></script>'
);
}