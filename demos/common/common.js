var demo = {};

// simple wrapper for logging
demo.log = function( message ) {
	var $log = $( ".log" );

	if ( ! $log.length ) {
		$.error( "div.log is required for demo logging to work." );

		return;
	}

	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();
	h = h > 9 ? h : "0" + h;
	m = m > 9 ? m : "0" + m;
	s = s > 9 ? s : "0" + s;

	var date = "" + h + ":" + m + ":" + s;
	$log.append( "<p>" + date + ": " + message + "</p>" );

	// scroll to bottom
	$log.scrollTop( $log[ 0 ].scrollHeight );
};

function beforeDemosCommon() {
	// catch the initial html before it would be turned into widgets
	window.demoBodyHTML = document.querySelector( ".demo-html" ).innerHTML;

	$.simone.taskbarSetup({
		// this is a fix for foundation topbar - don't use it in production sites,
		// it's only for the demos; "correct" alongside "no-top-bar" class
		// will set windows containment to start at the top of the window,
		// for those demos where top taskbar is required
		viewportMargins: {
			// dont add margings if demo does not have top bar
			top: [
				  ! document.getElementsByTagName( "body" ).className
				 || document.getElementsByTagName( "body" ).className.indexOf( "no-top-bar" ) === -1
					? 45
					: 0,
				"correct"
			]
		},
		localization: {
			en: {
				// add translation for group meta so no debug warning will be generated
				// when first taskbar is created
				"group:meta": "Meta"
			}
		},
		icons: {
			// set icon for meta window group
			"group:meta": "ui-icon-info"
		}
	});

	$.simone.windowSetup({
		close: function ( event, ui ) {
			// try to destroy tabs first
			try {
				ui.$window.tabs( "destroy" );
			} catch( e ) {}

			// remove window contents on close
			ui.$window.empty();
		}
	});

	if ( $( "body").hasClass( "no-top-bar") ) {
		$( ".demo .description" ).append(
			  "<br><br><strong>Note:</strong> This demo required that the top bar be not present. "
			+ "You can <a tabindex=\"-1\" href=\"../../docs/demos.html\">go to demos index</a> and navigate from there instead."
		);

		$.simone.taskbarSetup({
			// no top bar - no top viewport margin
			viewportMargins: {
				top: [ 0, "correct" ]
			},
		});
	}
}

// we load this after demo, because taskbar is already there,
// and taskbar is always part of the demo
function loadDemosCommon() {
	"use strict";

	var $windowControls = $( "<div></div>" );
	var $body           = $( "body" );

	$windowControls
		.prependTo( $body )
		.append(
			$( "<div></div>" )
				.attr( "id", "theme-switch" )
		)
		.append(
			$( "<div></div>" )
				.addClass( "theme-switch-notice notice" )
				.text(
					! window.navigator.onLine
						? "Notice: theme switching will not work if you're offline."
						: undefined
				)
		)
		.append(
			"<hr>"
		)
		.append(
			$( "<label></label>" )
				.text( "Change font size:" )
		)
		.append(
			$( "<div></div>" )
				.addClass( "font-size-slider" )
		)
		.append(
			$( "<div></div>" )
				.addClass( "font-size-value notice" )
				.html( "Font size: <span></span> px")
		);

	$( "#theme-switch" ).jui_theme_switch({
		stylesheet_link_id: "ui-theme",
		datasource_url    : "../../libs/jui_theme_switch/official.json",
		use_groups        : "no",
		onChangeTheme     : function(event, theme) {
			$( ".simone-taskbar" ).each(function () {
				var $this = $(this),
				    self = $this.data( "simone-taskbar" ),
				    bgUrl = [];

				    bgUrl[ 0 ] = self._styleIndicator( ".ui-state-default .ui-icon", "backgroundImage" ).backgroundImage,
				    bgUrl[ 1 ] = self._styleIndicator( ".ui-state-hover .ui-icon", "backgroundImage" ).backgroundImage,
				    bgUrl[ 2 ] = self._styleIndicator( ".ui-state-active .ui-icon", "backgroundImage" ).backgroundImage;

				var timeout,
				    counter = 0;

				// checking url of icon background is the best way of determining
				// if new
				function checkBackgroundLoad() {
					var newBgUrl = [];

					    newBgUrl[ 0 ] = self._styleIndicator( ".ui-state-default .ui-icon", "backgroundImage" ).backgroundImage,
					    newBgUrl[ 1 ] = self._styleIndicator( ".ui-state-hover .ui-icon", "backgroundImage" ).backgroundImage,
					    newBgUrl[ 2 ] = self._styleIndicator( ".ui-state-active .ui-icon", "backgroundImage" ).backgroundImage;

					if ( newBgUrl[ 0 ] !== bgUrl[ 0 ] && newBgUrl[ 1 ] !== bgUrl[ 1 ] && newBgUrl[ 2 ] !== bgUrl[ 2 ] ) {
						$this.taskbar( "refresh" );

						// refresh windows position - changing themes changes
						// dimensions of many things, and taskbar( "refresh" ),
						// does not refresh windows position when containment
						// didn't change
						$this.taskbar( "windows" ).window( "refreshPosition" );

						clearTimeout(timeout);

						return;
					}

					counter ++;

					timeout = setTimeout( checkBackgroundLoad, 50 );
				}

				counter = 0;

				checkBackgroundLoad();
			});
		}
	});

	$( "#lbl_theme-switch" ).text( $( "#lbl_theme-switch" ).text() + ":" );

	var $fontSizeSlider = $( ".font-size-slider" );
	var $fontSizeValue  = $( ".font-size-value span" );

	function slide( event, ui ) {
		$body.css( "font-size", ui.value );
		$fontSizeValue.text( ui.value );
		$( ".simone-taskbar" ).taskbar( "refresh" );
	}

	$fontSizeSlider.slider({
		min: 10,
		max: 16,
		value: parseInt( $body.css( "font-size" ) ),
		slide: slide,
		stop: slide
	});

	$fontSizeValue.text(
		$fontSizeSlider.slider( "option", "value" )
	);

	$windowControls.window({
		position: {
			my: "left top",
			at: "left top"
		},
		title: "Controls",
		group: "meta",
		width: 350,
		height: 250
	});

	var $windowCode = $( "<div></div>" )
		.addClass( "code" )
		.prependTo( $body )
		.prepend(
			$( "<label></label>" )
				.addClass( "code-main-label" )
				.text( "Code required for this demo (excluding meta windows, not excluding demo window HTML):" )
		);

	var $codeTabs = $( "<ul></ul>" )
		.addClass( "code-tabs" );

	$windowCode
		.append( $codeTabs );

	var codeConfig = {
		js: {
			className     : "demo-js",
			id            : "js",
			prismClassName: "language-javascript",
			tabName       : "JavaScript"
		},
		html: {
			className     : "demo-html",
			id            : "html",
			prismClassName: "language-markup",
			tabName       : "HTML",
			// remove content of div.description
			// and replace it with "..."
			beforeCallback: function () {
				var html = window.demoBodyHTML;

				var divMatch = /<div class="description/g.exec( html );

				if ( divMatch && divMatch.index ) {
					var startIndexes = [], endIndexes = [], match;

					var start = /<div/g;
					var end   = /\/div>/g;

					// count opening and closing div tags
					while ( ( match = start.exec( html ) ) != null ) {
						startIndexes.push( match.index );
					}

					while ( ( match = end.exec( html ) ) != null ) {
						endIndexes.push( match.index );
					}

					// find matching closing tag
					var start         = $.inArray( divMatch.index, startIndexes );
					var stopPosition  = endIndexes[ start - 1 ] + 5; // "/div>".length === 5

					// replace everything within matched tag with placeholder;
					// it's non ideal, as it will fail with poorly formatted HTML
					return html.slice( 0, divMatch.index )
						+ "<div class=\"description\">...</div>"
						+ html.slice( stopPosition );

					return html.slice( divMatch.index, stopPosition );
				}

				return html;
			},
		},
		css: {
			className     : "demo-css",
			id            : "css",
			prismClassName: "language-css",
			tabName       : "CSS",
		}
	};

	$.each( codeConfig, function ( languageName, props ) {
		var $elem    = $( "." + props.className );
		var codeBody = $elem.text();

		if ( props.beforeCallback ) {
			codeBody = props.beforeCallback( $elem, codeBody );
		}

		if ( typeof codeBody === "string" && codeBody.length ) {
			if ( props.afterCallback ) {
				codeBody = props.afterCallback( codeBody );
			}

			// remove linebreaks from the begining and the end of string
			codeBody = codeBody.replace( /^[\r\n]+/g, "" );
			codeBody = codeBody.replace( /[\r\n]+$/g, "" );

			// don't append empty strings,
			// event when element was found
			if ( ! codeBody.length ) {
				return true;
			}

			$( "<div></div>" )
				.attr( "id", props.id )
				.prepend(
					$( "<pre></pre>" )
						.prepend(
							$( "<code></code>" )
								.addClass( props.prismClassName )
						)
				)
				.appendTo( $windowCode );

			$( "." + props.prismClassName ).text( codeBody );

			$codeTabs.append(
				$( "<li></li>" ).append(
					$( "<a></a>" )
						.attr( "href", "#" + props.id )
						.text( props.tabName )
					)
				);
		}
	});

	// highlight Prism containers before window auto height is set,
	// otherwise scrollbars would appear
	Prism.highlightAll();

	if ( $codeTabs.children().length ) {
		$windowCode
			// create tabs before window,
			// otherwise height would be to high
			// (all containers visible, one after the other)
			.tabs()
			.window({
				position: {
					my: "right top",
					at: "right top"
				},
				title: "Code required",
				group: "meta",
				width: 680, // line can have around 80 chars
				height: "auto"
			});
	} else {
		$windowCode.detach();
	}

	// clear .demo content on dblclick
	$( ".log" ).on( "dblclick", function () {
		$( this ).empty();
	});

	// no fucus on links, their not that important
	$( ".demo" )
		.find( "a" )
		.attr( "tabindex", "-1" );

	var demoName = $.trim( $( "title" ).text().split( /[\-—–]/ )[ 0 ] );

	$( ".demo" ).window({
		title: "Demo: " + demoName,
		position: {
			my: "center top",
			at: "center top"
		},
		group: "meta",
		width: 400,
		height: "auto"
	});

	// move main demo description to top
	$( ".demo" ).window( "moveToTop" );
}