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
                // dev: "https://test-api.es-doc.org",
                dev: "http://localhost:5000",
                prod: "https://api.es-doc.org",
                test: "https://test-api.es-doc.org"
            },

            // ES-DOC homepage.
            HOME_PAGE: "https://es-doc.org",

            // Documentation search.
            SEARCH: "/2/summary/search",

            // Documentation search setup.
            SEARCH_SETUP: "/2/summary/search/setup",

            // Base viewer url in various modes.
            VIEWER: {
                dev: "../esdoc-web-view/index.html",
                prod: "http://view.es-doc.org",
                test: "https://test-view.es-doc.org"
            },

            EXPLORER: {
                dev: "http://localhost:8080",
                prod: "https://explore.es-doc.org",
                test: "https://test-explore.es-doc.org"
            }
        },

        // Set of email related constants.
        EMAIL: {
            // Contact email.
            CONTACT: "support@es-doc.org",

            // Support email.
            SUPPORT: "support@es-doc.org",

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
