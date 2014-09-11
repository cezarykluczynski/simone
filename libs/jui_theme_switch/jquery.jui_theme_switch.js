/**
 * @fileOverview jui_theme_switch: jquery plugin to switch juery-ui themes
 *               <p>License MIT
 *               <br />Copyright 2012 Christos Pontikis <a href="http://pontikis.net">http://pontikis.net</a>
 *               <br />Project page <a href="http://pontikis.net/labs/jui_theme_switch">http://pontikis.net/labs/jui_theme_switch</a>
 * @version 1.0.6 (21 Jan 2013)
 * @author Christos Pontikis http://pontikis.net
 * @requires jquery, jquery-ui
 */

/**
 * See <a href="http://jquery.com">http://jquery.com</a>.
 * @name $
 * @class
 * See the jQuery Library  (<a href="http://jquery.com">http://jquery.com</a>) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See <a href="http://jquery.com">http://jquery.com</a>
 * @name fn
 * @class
 * See the jQuery Library  (<a href="http://jquery.com">http://jquery.com</a>) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf $
 */

/** the foolowing is OPTIONAL in case private methods will be documented  */
/**
 * Pseudo-Namespace containing private methods (for documentation purposes)
 * @name _private_methods
 * @namespace
 */
"use strict";
(function($) {

    var pluginName = 'jui_theme_switch',
        pluginStatus = 'jui_theme_switch_status';

    /* public methods ------------------------------------------------------- */
    var methods = {

        /**
         * @lends $.fn.jui_theme_switch
         */
        init: function(options) {

            var elem = this;

            return this.each(function() {

                /**
                 * settings and defaults
                 * using $.extend, settings modification will affect elem.data() and vive versa
                 */
                var settings = elem.data(pluginName);
                if(typeof(settings) == 'undefined') {
                    var defaults = elem.jui_theme_switch('getDefaults');
                    settings = $.extend({}, defaults, options);
                } else {
                    settings = $.extend({}, settings, options);
                }
                elem.data(pluginName, settings);

                // initialize plugin status
                if(typeof  elem.data(pluginStatus) === 'undefined') {
                    elem.data(pluginStatus, {});
                    elem.data(pluginStatus)["selected_theme"] = {};
                }


                elem.unbind("onChangeTheme").bind("onChangeTheme", settings.onChangeTheme);
                elem.unbind("onDisplay").bind("onDisplay", settings.onDisplay);

                var container_id = elem.attr("id"),
                    themes_len, i, html = '',
                    switcher_id = create_id(settings.switcher_id_prefix, container_id),
                    switcher_label_id = create_id(settings.switcher_label_id_prefix, container_id),
                    elem_switcher, elem_switcher_label,
                    elem_link = $("#" + settings.stylesheet_link_id),
                    selected = '', current_group, themes_group = '',
                    project_url = '';

                $.ajax({
                    url: settings.datasource_url,
                    dataType: 'json',
                    cache: false,
                    success: function(data) {

                        themes_len = data.length;

                        html += '<label id="' + switcher_label_id + '" for="' + switcher_id + '">' + settings.switcher_label + '</label>';
                        html += '<select id="' + switcher_id + '" size="' + settings.list_size + '">';
                        for(i = 0; i < themes_len; i++) {

                            if(current_group = data[i]["active"] == "yes" || settings.show_all == "yes") {

                                if(settings.use_groups == "yes") {
                                    current_group = data[i]["group"];
                                    if(current_group !== themes_group) {
                                        html += '<optgroup label="' + current_group + '">';
                                        themes_group = current_group;
                                    }
                                }

                                if(settings.default_theme == data[i]["theme_name"]) {
                                    elem.data(pluginStatus)["selected_theme"] = data[i];
                                    selected = ' selected="selected"';
                                } else {
                                    selected = '';
                                }

                                project_url = '';
                                if(data[i].hasOwnProperty("hosted_locally")) {
                                    if(data[i]["hosted_locally"] == "yes") {
                                        project_url = settings.project_url
                                    }
                                }

                                html += '<option value="' + project_url + data[i]["theme_url"] + '"' + selected + '>';
                                html += data[i]["theme_name"];
                                html += '</option>';

                                if(settings.use_groups == "yes") {
                                    if(i < themes_len - 1 && data[parseInt(i) + 1]["group"] !== themes_group) {
                                        html += '</optgroup>';
                                    }
                                }
                            }
                        }
                        html += '</select>';

                        elem.html(html);

                        elem_switcher_label = $("#" + switcher_label_id);
                        elem_switcher = $("#" + switcher_id);

                        elem_switcher_label.removeClass().addClass(settings.labelClass);
                        elem_switcher.removeClass().addClass(settings.listClass);
                        elem.removeClass().addClass(settings.containerClass);

                        // change theme
                        elem.off('change', elem_switcher).on('change', elem_switcher, function() {
                            elem_link.attr("href", elem_switcher.val());

                            for(i = 0; i < themes_len; i++) {
                                if($("#" + switcher_id + " option:selected").text() == data[i]["theme_name"]) {
                                    elem.data(pluginStatus)["selected_theme"] = data[i];
                                    break;
                                }
                            }

                            // trigger event onChangeTheme
                            elem.triggerHandler("onChangeTheme", data[i]);

                        });


                        // JUI_THEME_SWITCH completed
                        // trigger event onDisplay
                        elem.triggerHandler("onDisplay");

                    }
                });

            });

        },

        /**
         * Get default values
         * @example $(element).jui_theme_switch('getDefaults');
         * @return {Object}
         */
        getDefaults: function() {
            return {
                switcher_label: "Select theme",
                default_theme: "ui-lightness",
                list_size: "1",
                use_groups: "yes",
                show_all: "no", // default is show items having "active": "yes"

                project_url: "", // url relative to web server document root (required only for locally hosted themes)

                containerClass: "switcher_container",
                labelClass: "switcher_label",
                listClass: "switcher_list",

                switcher_label_id_prefix: "lbl_",
                switcher_id_prefix: "switcher_",

                onChangeTheme: function() {

                },
                onDisplay: function() {

                }
            };
        },

        /**
         * Get any option set to plugin using its name (as string)
         * @example $(element).jui_theme_switch('getOption', some_option);
         * @param {String} opt
         * @return {*}
         */
        getOption: function(opt) {
            var elem = this;
            return elem.data(pluginName)[opt];
        },

        /**
         * Get all options
         * @example $(element).jui_theme_switch('getAllOptions');
         * @return {*}
         */
        getAllOptions: function() {
            var elem = this;
            return elem.data(pluginName);
        },

        /**
         * Set option
         * @example $(element).jui_theme_switch('setOption', 'option_name',  'option_value',  reinit);
         * @param {String} opt option names
         * @param val
         * @param {Boolean} reinit
         */
        setOption: function(opt, val, reinit) {
            var elem = this;
            elem.data(pluginName)[opt] = val;
            if(reinit) {
                elem.jui_theme_switch('init');
            }
        },

        /**
         * Refresh plugin
         * @example $(element).jui_theme_switch('refresh');
         * @return {*|jQuery}
         */
        refresh: function() {
            var elem = this;
            elem.jui_theme_switch();
        },

        /**
         * Destroy plugin
         * @example $(element).jui_theme_switch('destroy');
         * @return {*|jQuery}
         */
        destroy: function() {
            return $(this).each(function() {
                var $this = $(this);

                $this.removeData(pluginName);
            });
        },

        /**
         * Get selected theme (as JSON object)
         *
         * @example $(element).jui_theme_switch('getTheme');
         * @return {*}
         */
        getTheme: function() {
            var elem = this;
            return elem.data(pluginStatus)["selected_theme"];
        }
    };

    /* private methods ------------------------------------------------------ */
    /** the foolowing is OPTIONAL in case private methods will be documented  */

    /**
     * @lends _private_methods
     */

    /**
     * Create element id
     * @param prefix
     * @param plugin_container_id
     * @return {*}
     */
    var create_id = function(prefix, plugin_container_id) {
        return prefix + plugin_container_id;
    };

    /**
     * jui_theme_switch - short description.
     *
     * @class jui_theme_switch
     * @memberOf $.fn
     */
    $.fn.jui_theme_switch = function(method) {

        // OPTIONAL
        if(this.size() != 1) {
            var err_msg = 'You must use this plugin (' + pluginName + ') with a unique element (at once)';
            this.html('<span style="color: red;">' + 'ERROR: ' + err_msg + '</span>');
            $.error(err_msg);
        }

        // Method calling logic
        if(methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if(typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.' + pluginName);
        }

    };

})(jQuery);