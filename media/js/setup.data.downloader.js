// --------------------------------------------------------
// search/search.data.downloader.js - Calls web-service search endpoint.
// --------------------------------------------------------
(function (APP, _, $) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Event handler: setup:begin.
    APP.on("setup:begin", function () {
        var url;

        url = APP.defaults.apiBaseURL + APP.constants.URLS.SEARCH_SETUP;
        $.get(url)
            .done(function (data) {
                APP.trigger("setup:setupDataDownload", data);
            })
            .fail(function () {
                setTimeout(function () {
                    APP.trigger("setup:setupDataDownload:error");
                }, APP.constants.uiUpdateDelay);
            });
    });

}(
    this.APP,
    this._,
    this.$
));