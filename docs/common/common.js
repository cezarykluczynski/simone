var jQueryJSON;

$( document ).ready( function () {
	var mainVersion;

	var isChildDir =
		   location.href.indexOf( "tests/unit" ) > -1
		|| location.href.indexOf( "tests/functional" ) > -1
		|| location.href.indexOf( "tests/manual" ) > -1
		|| location.href.indexOf( "tests/stress" ) > -1
		|| location.href.indexOf( "tests/templates" ) > -1
		|| location.href.indexOf( "demos/functional" ) > -1
		|| location.href.indexOf( "demos/technical" ) > -1
		|| location.href.indexOf( "demos/templates" ) > -1;

	var $body = $( "body" );
	var hasTopBar = ! $body.hasClass( "no-top-bar" );
	var $topbar;

	function getVersion() {
		if ( hasTopBar ) {
			$.ajax({
				method  : "get",
				dataType: "json",
				url     : "../" + ( isChildDir ? "../" : "" ) + "simone.jquery.json",
				async   : false,
				cache   : false,
				success : function ( data ) {
					mainVersion = data.version;

					jQueryJSON = data;

					prependTopbar();
				}
			});
		} else {
			always();
		}
	}

	function setTopBarActive() {
		var hrefPath = location.href.split( "/" );

		haystack = hrefPath.slice( hrefPath.length - ( isChildDir ? 3 : 2 ) ).join( "/" ).split( "#" )[ 0 ];
		var $mainBar = $( ".main-bar" );
		var $topLevelItems = $mainBar.children( "li:not(.has-form)" );
		var $links = $( ".top-bar a" );
		var count = 0;

		$links.each( function () {
			var $link = $( this );
			var href = $link.attr( "href" ).split( "#" )[ 0 ];
			var $parents;

			if ( href.indexOf( haystack ) > -1 ) {
				$parents = $link.parents();

				$topLevelItems.each( function () {
					var $item = $( this );

					if ( $item.is( $parents ) ) {
						++count;

						if ( count > 1 ) {
							// we're probably in main docs dir, let's go to index.html
							if ( location.href.indexOf( ".html" ) === -1 ) {
								$links.removeClass( "active" );

								location = location.href
									+ ( location.href[ location.href.length - 1] === "/" ? "" : "/" )
									+ "index.html";
							}
						} else {
							$item.addClass( "active" );
						}

						return false;
					}
				})
			}
		});
	}

	function hashchange() {
		var $item = $( "#" + location.hash.substr( 1 ) );

		var description = $item.closest( "main" ).length;
		var tos         = $item.closest( ".tos" ).length;

		if ( description || tos ) {
			var $highlight = tos ? $item : $item.closest( "tr" );

			$highlight.addClass( "highlight" );

			setTimeout( function () {
				$highlight.removeClass( "highlight" );
			}, 1000 );
		}
	}

	function always() {
		$( window ).on( "hashchange", hashchange );

		if ( ! hasTopBar ) {
			return;
		}

		$topbar.removeAttr( "style" );

		$( document ).foundation({
			topbar: {
				is_hover: true,
				custom_back_text: false,
				mobile_show_parent_link: true
			}
		});

		if ( location.href.indexOf( "showTopBar=no" ) > -1 ) {
			$topbar.hide();
			$body.css( "margin-top", 0 );
		}

		$( window ).trigger( "hashchange" );
	}

	function onSuccess( html ) {
		$body.append( html );

		var $version = $( ".button.version" )

		$version.text(
			$version
				.text()
				.replace( "@simone-main-version", mainVersion )
		).attr( "href", $version.attr( "href" ).replace( "@simone-main-version", mainVersion ) );

		$topbar = $( "#topbar" );

		if (isChildDir) {
			$topbar.find( "a" ).each( function () {
				var href = $( this ).attr( "href" );

				if ( href.indexOf( "javascript:void(0)") > -1 || href.indexOf( "http" ) === 0 ) {
					return true;
				}

				$( this ).attr( "href", "../" + href );
			});
		}

		setTopBarActive();

		$topbar.css( "top", 0 );

		always();
	}

	function prependTopbar() {
		var path = "../" + ( isChildDir ? "../" : "" ) + "docs/common/topbar.html";

		$.ajax({
			method  : "GET",
			url     : path,
			dataType: "html",
			success : onSuccess,
			async   : false,
			cache   : false
		});
	}

	// put topbar only in the top frame
	// - we don't want topbar in an iframe
	if ( window === window.top ) {
		getVersion();

		var insertedInterval = 0;

		// use interval to detect when it's safe to insert links,
		// because otherwise test list would not be prepended on occasions
		insertedInterval = setInterval( function () {
			var $header = $( "#qunit-header" );

			if ( $header.length ) {
				$header.addClass( "no-top-radius" );
				clearInterval( insertedInterval );
			}
		}, 100 );
	} else {
		$( "body" ).addClass( "stick-to-top" );
	}

	$( ".tos-contents" ).on( "scroll", function () {
		$this = $( this );

		var position = ( $this.scrollTop() + $this.innerHeight() / 2 ) / $this[ 0 ].scrollHeight;

		var top    = position <  .5 ? Math.round( 2.5 / position ) : 0;
		var bottom = position >= .5 ? Math.round( 2.5 / ( 1 - position ) ) : 0;

		$this.find( ".top-arrow" ).css( "opacity", bottom / 40 );
		$this.find( ".bottom-arrow" ).css( "opacity", top / 40 );

		var $arrows = $this.find( ".top-arrow, .bottom-arrow" );

		// hide arrows if tos does not have v-scrollbar
		$arrows.toggle( $this[ 0 ].scrollHeight >  $this.innerHeight() );
	}).trigger( "scroll" );

	$( window ).on( "resize", function () {
		$( ".tos-contents" ).trigger( "scroll" );
	})
});

function ucFirst( string ) {
	return string[ 0 ].toUpperCase() + string.slice( 1 );
}

function loadFileManifest( url, options ) {
	$.ajax({
		url: url,
		dataType: "json"
	}).success( function ( result ) {
		buildFileList( result, options );
		if ( options.afterBuild ) {
			options.afterBuild.call( this, result, options );
		}
	}).error( function ( xhr, status, error ) {
		fileAjaxError( status + "<br>" + error );
	});
}


function buildFileList( json, options ) {
	if ( typeof options.skip === "undefined" ) {
		options.skip = [];
	}

	var types = [];
	var widgets = [];

	// sort file manifest in a desired order
	var keys  = Object.keys( json.files ),
	    files = {};

	function setFlatOrder( pathinfo ) {
		if ( pathinfo.length === 1 ) {
			var tags = json.files[ pathinfo[ 0 ] ].tags;

			$.each( tags, function ( index, tag ) {
				if ( tag.substr( 0, 5 ) === "type:" ) {
					pathinfo[ 1 ] = pathinfo[ 0 ];
					pathinfo[ 0 ] = tag.substr( 5 );
					return false;
				}
			});
		}

		return pathinfo;
	}

	keys.sort( function ( key1, key2 ) {
		var pathinfo1 = key1.split( "/" );
		var pathinfo2 = key2.split( "/" );

		pathinfo1 = setFlatOrder( pathinfo1 );
		pathinfo2 = setFlatOrder( pathinfo2 );

		var position1 = $.inArray( pathinfo1[ 0 ], options.order );
		var position2 = $.inArray( pathinfo2[ 0 ], options.order );

		var result = position1 !== position2
			? position1 < position2
			: pathinfo1[ 1 ] < pathinfo2[ 1 ];

		return result ? -1 : 1;
	});

	$.each( keys, function ( index, key ) {
		files[ key ] = json.files[ key ];
	});

	$.each( files, function ( path, props ) {
		var $li = $( "<li></li>" );

		var type, widget;

		if ( typeof props.tags === "object" ) {
			$.each( props.tags, function ( index, tag ) {
				if ( tag.substr( 0, 5 ) === "type:" ) {
					type = tag.substr( 5 );
				}

				if ( tag.substr( 0, 7 ) === "widget:" ) {
					widget = tag.substr( 7 );
				}
			});
		}

		var fileName = path.split( "/" );
		fileName = fileName[ fileName.length - 1 ].split( "." )[ 0 ];

		var $container = options.containers[ type ] || options.containers[ "*" ];

		// skip those files in manifest that we don't want on list
		if ( $.inArray( type, options.skip ) > -1 ) {
			return true;
		}

		if ( $.inArray( type, types ) === -1 && type !== "template" && typeof type !== "undefined" ) {
			$li
				.addClass( "h1" )
				.attr( "data-header-for", type )
				.text( ucFirst( type ) + " " + (
					typeof options.sectionLabel !== "undefined"
					? options.sectionLabel
					: options.category
				));

			var $span = $( "<span></span>" )
				.addClass( "anchor-fix" )
				.attr( "id", options.category + "-" + type );

			$span.appendTo( $container );
			$li.appendTo( $container );

			types.push( type );

			widgets = [];

			// recreate $li for current file or widget header,
			// after header for test type was created
			$li = $( "<li></li>" );
		}

		if ( $.inArray( widget, widgets ) === -1 && typeof widget !== "undefined" ) {
			$li
				.addClass( "h2" )
				.text( ucFirst( widget ) );

			$li.appendTo( $container );

			widgets.push( widget );

			// recreate $li for current file,
			// after header for widget type was created
			$li = $( "<li></li>" );
		}

		var $a = $( "<a></a>" )
			.attr( "href", "../" + options.category + "/" + path )
			.text( props.name );

		var $span = $( "<span></span>" )
			.text( ": " + props.description );

		$li
			.append( $a )
			.append( $span )
			.attr(
				"data-file-group-id",
				type
				+ ( widget ? "-" + widget : "" )
				+ "-"
				+ fileName
			)
			.addClass(
				widgets.length === 0 && type !== "template" && ! options.setBullets
					? "no-bullets"
					: ""
			);

		$li.appendTo( $container );
	});
}

function fileAjaxError( error ) {
	$( ".file-list:eq(0), .general-error" ).append(
		"<div data-alert class=\"alert-box alert\">" + error + "</div>"
	);
}

function checkAjaxPossibilities() {
	if ( location.protocol === "file:" ) {
		fileAjaxError(
			"This file has to be run on a server " +
			"- \"file:\" protocol is not supported!"
		);

		return false;
	}
}