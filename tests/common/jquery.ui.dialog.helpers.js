TestHelpers.commonWidgetTests( "window", {
	defaults: {
		appendTo: "body",
		autoOpen: true,
		buttons: [],
		closeOnEscape: false, // false for window, true for dialog
		closeText: "Close",
		disabled: false,
		dialogClass: "",
		draggable: true,
		height: "auto",
		hide: false, // false for window, null for dialog
		maxHeight: null,
		maxWidth: null,
		minHeight: 150,
		minWidth: 150,
		modal: false,
		position: {
			my: "center",
			at: "center",
			of: window,
			collision: "fit",
			using: $.ui.dialog.prototype.options.position.using
		},
		resizable: true,
		show: false, // false for window, null for dialog
		title: null,
		width: 300,

		// callbacks
		beforeClose: null,
		close: null,
		create: null,
		drag: null,
		dragStart: null,
		dragStop: null,
		focus: null,
		open: null,
		resize: null,
		resizeStart: null,
		resizeStop: null
	}
});

TestHelpers.window = {
	drag: function(element, handle, dx, dy) {
		var d = element.window("widget");
		//this mouseover is to work around a limitation in resizable
		//TODO: fix resizable so handle doesn't require mouseover in order to be used
		$( handle, d ).simulate("mouseover").simulate( "drag", {
			dx: dx,
			dy: dy
		});
	},
	testDrag: function(element, dx, dy, expectedDX, expectedDY, msg) {
		var actualDX, actualDY, offsetAfter,
			d = element.window("widget"),
			handle = $(".ui-dialog-titlebar", d),
			offsetBefore = d.offset();

		TestHelpers.window.drag(element, handle, dx, dy);

		offsetAfter = d.offset();

		msg = msg ? msg + "." : "";

		actualDX = offsetAfter.left - offsetBefore.left;
		actualDY = offsetAfter.top - offsetBefore.top;
		ok( expectedDX - actualDX <= 1 && expectedDY - actualDY <= 1, "dragged[" + expectedDX + ", " + expectedDY + "] " + msg);
	},
	// TODO switch back to checking the size of the .ui-dialog element (var d)
	// once we switch to using box-sizing: border-box (#9845) that should work fine
	// using the element's dimensions to avoid subpixel errors
	shouldResize: function(element, dw, dh, msg) {
		var heightAfter, widthAfter, actual, expected,
			d = element.window("widget"),
			handle = $(".ui-resizable-se", d),
			// use parent inner height instead of element height,
			// because ui-dialog-content in window does not keep
			// it's height if it's not required
			heightBefore = element.parent().innerHeight(),
			widthBefore = element.parent().innerWidth();

		TestHelpers.window.drag(element, handle, 50, 50);

		heightAfter = element.parent().innerHeight();
		widthAfter = element.parent().innerWidth();

		msg = msg ? msg + "." : "";
		actual = { width: widthAfter, height: heightAfter },
		expected = { width: widthBefore + dw, height: heightBefore + dh };
		deepEqual(actual, expected, "resized[" + 50 + ", " + 50 + "] " + msg);
	}
};
