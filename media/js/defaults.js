// --------------------------------------------------------
// app.defaults.js - defaults used across application.
// --------------------------------------------------------
(function (APP, host) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Declare defaults used within plugin.
    APP.defaults = {
        // Execution mode.
        mode: function () {
            if (host && host.indexOf('es-doc.org') >= 0) {
                if (host.indexOf('test') >= 0) {
                    return 'test';
                } else {
                    return 'prod';
                }
            } else {
                return 'dev';
            }
        }(),

        // Default document type.
        documentType: "cim.2.designing.Project",

        // Default document version.
        documentVersion: "latest",

        // Default project.
        project: "cmip6",
    };

    // Set API base url.
    APP.defaults.apiBaseURL = APP.constants.URLS.API[APP.defaults.mode];

    // Set viewerBaseURL.
    APP.defaults.viewerBaseURL = APP.constants.URLS.VIEWER[APP.defaults.mode];

    // Set explorerBaseURL.
    APP.defaults.explorerBaseURL = APP.constants.URLS.EXPLORER[APP.defaults.mode];
}(
    this.APP,
    window.location.host
));
