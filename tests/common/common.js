testsConfig = {};
warnings = {};

$.ajax({
	url: "../../config/tests.json",
	async: false,
	cache: false
}).success( function ( json ) {
	testsConfig = json;
	warnings = testsConfig.qunit.warnings;

	$.each( json.qunit.urlConfig, function ( id, config ) {
		QUnit.config.urlConfig.push( config );
	});
});

$( document ).ready( function () {
	// if $.uitw is defined, this is not a all.html
	if ( $.simone ) {
		prototype           = $.simone.taskbar.prototype;
		fullscreenAvailable = prototype._fullscreenAvailable();
		dataPrefix          = prototype._cnst.dataPrefix;
		defaults            = prototype.options;
		timeout             = 1000;

		$taskbar  = $( ".taskbar" );
		$taskbar2 = $( ".taskbar2" );
	}

	var $warning = $( "<div></div>" )
		.addClass( "warning" );

	var $body = $( "body" );

	var topFrame = top.location === location;

	testsConfig = {
		// whether to show drag trace on tests involving
		// simulated drag events;
		// true is useful for writing news tests,
		// false is more convenient for running
		// large number of already written test
		showDragTrace: location.search.indexOf( "showDragTrace=yes" ) > -1,
		// do we want taskbar to be set to default values
		// after tests has been completed;
		// false is useful for writing new tests
		// true is more convenient for running
		// large number of already written test
		resetOnDone: location.search.indexOf( "resetOnDone=no" ) === -1
	};

	if ( document.location.href.indexOf( "showTopBar=no") > -1 ) {
		$body.addClass( "no-top-bar" );
	}

	if ( $body.hasClass( "all" ) ) {
		var unsupported_browser;
		var firefox = /firefox/i.test( navigator.userAgent );

		// don't need that for now
		if ( unsupported_browser ) {
			QUnit.config.autostart = false;

			$( "<p></p>" )
				.html( "This browser cannot run tests in iframes. " +
					"Run test manually from <a href=\"../../docs/tests.html\">tests</a> page instead." )
				.prependTo( $warning );

			$warning
				.addClass( "alert-box" )
				.prependTo( $body );

			return;
		}
	}

	eventSimulateOptions = {
		onDrag: function ( ui ) {
			if ( ! testsConfig.showDragTrace ) {
				return;
			}

			var $div = $("<div></div>")
				.prependTo( $("body") )
				.css({
					position: "fixed",
					top: ui.y,
					left: ui.x,
					zIndex: 20000,
					width: 3,
					height: 3,
					background: "black"
				});

			setTimeout(function () {
				$div.remove();
			}, timeout );

			timeout += 100;
		},
		moves: 5,
	};

	inRange = function ( value, start, end ) {
		if ( typeof end === "undefined" ) {
			end = start[ 1 ];
			start = start[ 0 ];
		}

		return value >= start && value <= end;
	}

	getMenu = function ( items, submenu ) {
		items = items || 2;

		var $menu = $( "<ul></ul>" )
			.uniqueId();

		// submenu should not have this attributes:
		// this would create additional start buttons
		if ( ! submenu ) {
			$menu
				.attr( "data-menu-lang", "en" )
				.attr( "data-menu-type", "start" )
				.attr( "data-menu-name", "test" );
		}

		for( i = 0; i < items; i++ ) {
			$menu.prepend(
				$( "<li></li>" )
					.prepend(
						$( "<a></a>" )
							.attr( "href", "#" )
							.text( "Item " + ( items - i ) )
					)
			);
		}

		return $menu;
	};

	// this function will create scrolls by appering
	// long and/or wide elements to the body;
	// it will also optionally set overflow to body
	setScrollOverflow = function( scroll, overflow ) {
		var $body = $( "body" );
		var $forceScroll = $( ".force-scroll" );

		if ( ! $forceScroll.length ) {
			$forceScroll = $( "<div></div>" )
				.addClass( "force-scroll" )
				.css({
					position: "absolute",
					zIndex  : -10000
				})
				.prependTo( $body );
		}

		// reset first - if scroll parameter is not given,
		// it means scroll should be reseted
		$forceScroll.css({
			width : 1,
			height: 1
		});

		if ( scroll === "both" || scroll === "x" ) {
			$forceScroll.css( "width", $( window ).innerWidth() * 2 );
		}

		if ( scroll === "both" || scroll === "y" ) {
			$forceScroll.css( "height", $( window ).innerHeight() * 2 );
		}

		$body.css( "overflow", overflow || "auto" );
	}

	// whis function will return true if $elem is within the vieport (meaning it is visible),
	// with the tolerance providen (default to 5)
	withinViewport = function( $elem, tolerance ) {
		var r = tolerance || 5;

		var instance = $( ".simone-taskbar:eq(0)" ).data( dataPrefix + "taskbar" );

		var elem        = instance._extendedPosition.call( $elem, "offset" );
		var containment = instance._extendedPosition.call( $( ".simone-taskbar-windows-containment"), "offset" );

		var top    = elem.bottom + r > containment.top    &&           elem.bottom < containment.bottom;
		var bottom = elem.top    - r < containment.bottom && ! top &&  elem.bottom > containment.top;
		var left   = elem.right  + r > containment.left   &&           elem.right  < containment.right;
		var right  = elem.left   - r < containment.right  && ! left && elem.right  > containment.left;

		var within = !! ( ( top ^ bottom ) && ( left ^ right ) );

		return within;
	};

	// whis function will take jQuery object and if it's taskbar,
	// will prevent debugLogAdd on this taskbar and it subordinate windows,
	// unless noPrevent === false, in which case it will do the opposite
	preventDebugLog = function( $elem, noPrevent ) {
		if ( $elem.hasClass( "simone-taskbar" ) ) {
			$elem.taskbar( "option", "debugLogAdd", function ( event, ui ) {
				if ( noPrevent !== false ) {
					event.preventDefault();
				}
			});
		}
	}

	// used in a few places to test code that should hide
	// taskbar's subordinate elements
	testHideSubordinates = function( options ) {
		var prev  = $taskbar.taskbar( "option", "languageSelect" );
		var prev2 = $taskbar.taskbar( "option", "clock" );

		var $menu = getMenu();

		$menu.prependTo( $taskbar );

		$taskbar.taskbar( "refresh" );

		var $window = $( "<div></div>" ).window({
			group: "test"
		});

		var $window2 = $( "<div></div>" ).window({
			group: "test"
		});

		$taskbar.taskbar( "option", "languageSelect", true );
		$taskbar.taskbar( "option", "clock", true );

		$taskbar.find( "[data-group-name=test]" ).trigger( "click" );
		$taskbar.find( "[data-button-name=clock]" ).trigger( "click" );

		$taskbar
			.find( "ul" )
			.add( ".hasDatepicker" );

		var $subordinates = $taskbar
			.find( "ul" )
			.add( ".hasDatepicker" );

		$subordinates
			.show();

		if ( typeof options == "function" ) {
			options.call( this );
		} else {
			deepEqual(
				[ $taskbar.find( "ul:visible").length, $taskbar.find( ".hasDatepicker:visible").length ],
				[ 3, 1 ],
				"Show all subordinate elements."
			);

			$taskbar.taskbar( options.event );

			deepEqual(
				[ $taskbar.find( "ul:visible").length, $taskbar.find( ".hasDatepicker:visible").length ],
				[ 0, 0 ],
				"Trigger \"" + options.event + "\". All subordinate elements hidden."
			);
		}

		// teardown
		$menu.detach();
		$taskbar.taskbar( "refresh" );

		$window.window( "close" );
		$window2.window( "close" );

		$taskbar.taskbar( "option", "languageSelect", prev );
		$taskbar.taskbar( "option", "clock", prev2 );
	}

	resetTaskbar = function ( id ) {
		if ( ! id ) {
			id = "";
		}

		var $this;

		if ( ! id ) {
			$this = $taskbar;
		} else if ( id == 2 ) {
			$this = $taskbar2;
		} else {
			$this = id;
		}

		try {
			$this.taskbar( "destroy" );
		} catch( e ) {}

		try {
			$this.taskbar();
		} catch( e ) {}
	}

	if ( topFrame ) {
		var subject = $body.hasClass( "all" ) ? "test suites" : "tests";

		$( "<p></p>" )
			.text(
				"Keep this window active and visible. " +
				"Otherwise some or all of the " + subject + " might fail."
			)
			.prependTo( $warning );
	}

	$.each( warnings, function ( className, warning ) {
		if ( $body.hasClass( className ) ) {
			$( "<p></p>" )
				.text( warning )
				.prependTo( $warning );
		}
	});

	if ( $warning.children().length ) {
		$warning
			.prependTo( $body )
			.show()
			.on( "click", function () {
				$( this ).hide();
			});
	}

	QUnit.begin( function () {
		if ( ! topFrame ) {
			$( ".top-bar" ).hide();
		}

		$body.addClass( "in-progress" );
	});

	QUnit.done( function () {
		// hide warning if user haven't clicked it already
		$warning.hide();

		if ( ! topFrame ) {
			$( ".top-bar" ).show();
		}

		$body.removeClass( "in-progress" );

		if ( ! testsConfig.resetOnDone ) {
			return;
		}

		if ( $.uitw ) {
			// some tests during development could end with destroyed taskbar,
			// so let's have the main taskbar try-catched too
			try {
				$taskbar.taskbar( "destroy" );
				$taskbar.taskbar();
			} catch ( e ) {}

			try {
				$taskbar2.taskbar( "destroy" );
				$taskbar2.taskbar();
			} catch ( e ) {}
		}
	});
});

// helpers:

function array_diff_assoc(arr1) {
	// discuss at: http://phpjs.org/functions/array_diff_assoc/
	// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// bugfixed by: 0m3r
	// revised by: Brett Zamir (http://brett-zamir.me)
	// example 1: array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'});
	// returns 1: {1: 'van', 2: 'Zonneveld'}
	var retArr = {},
		argl = arguments.length,
		k1 = '',
		i = 1,
		k = '',
		arr = {};

	arr1keys: for (k1 in arr1) {
		for (i = 1; i < argl; i++) {
			arr = arguments[i];
			for (k in arr) {
				if (arr[k] === arr1[k1] && k === k1) {
					// If it reaches here, it was found in at least one array, so try next value
					continue arr1keys;
				}
			}
			retArr[k1] = arr1[k1];
		}
	}

	return retArr;
}
