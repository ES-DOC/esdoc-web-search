// --------------------------------------------------------
// app.constants.js - constants used across application.
// --------------------------------------------------------
(function(APP) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Declare constants used within plugin.
    APP.constants = {
        // Application constants.
        app: {
            // Returns title.
            getTitle: function () {
                return APP.NAME;
            },

            // Returns version.
            getVersion: function () {
                var result;
                result = ' (v';
                result += APP.VERSION;
                result += ')';
                return result;
            },

            // Returns caption.
            getCaption: function (includeVersion) {
                var caption;
                caption = APP.NAME;
                caption += ' - ';
                caption += APP.options.activePlugin;
                if (includeVersion) {
                    caption += ' (v';
                    caption += APP.VERSION;
                    caption += ')';
                }
                return caption;
            }
        },

        URLS: {
            // Base API url in various modes.
            API: {
                dev: "http://localhost:5000",
                prod: "http://api.es-doc.org",
                test: "http://test.api.es-doc.org"
            },

            // ES-DOC homepage.
            HOME_PAGE: "http://es-doc.org",

            // Documentation search.
            SEARCH: "/2/summary/search",

            // Documentation search setup.
            SEARCH_SETUP: "/2/summary/search/setup",

            // Base viewer url in various modes.
            VIEWER: {
                dev: "../esdoc-web-view/index.html",
                prod: "http://view.es-doc.org",
                test: "http://test.view.es-doc.org"
            }
        },

        // Set of email related constants.
        EMAIL: {
            // Contact email.
            CONTACT: "es-doc-contact@list.woc.noaa.gov",

            // Support email.
            SUPPORT: "es-doc-support@list.woc.noaa.gov",

            // Default email subject.
            SUBJECT: 'ES-DOC SEARCH :: subject goes here',

            // Default email message.
            MESSAGE: "Dear ES-DOC SEARCH support team,"
        },

        // Logging related.
        logging: {
            PREFIX: "ES-DOC-SEARCH :: "
        },

        // Text to display in lieu of null value.
        NULL_FIELD: '--',

        // Delay in milliseconds before UI updates are performed so as to avoid ugly flickering.
        uiUpdateDelay: 250
    };

}(
    this.APP
));
