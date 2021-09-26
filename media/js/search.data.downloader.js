// --------------------------------------------------------
// search/search.data.downloader.js - Calls web-service search endpoint.
// --------------------------------------------------------
(function (APP, constants, state, filters, _, $) {

    // ECMAScript 5 Strict Mode
    "use strict";

    var // Returns search url parameters.
        getSearchParams = function () {
            var p = filters.project.data.current,
                params = {
                    document_type: p.documentType.current.shortKey,
                    document_version: p.documentVersion.current.key,
                    project : p.key
                };

            // Set optional params.
            if (p.subProject.current.key !== "*") {
                params.sub_project = p.subProject.current.shortKey;
            }
            if (p.institute.current.key !== "*") {
                params.institute = p.institute.current.shortKey;
            }
            if (p.model.current.key !== "*") {
                params.model = p.model.current.shortKey;
            }
            if (p.experiment.current.key !== "*") {
                params.experiment = p.experiment.current.shortKey;
            }

            return params;
        },

        // Performs a search.
        doSearch = function (eventType) {
            var url, params;

            url = APP.defaults.apiBaseURL + constants.URLS.SEARCH;
            params = getSearchParams();

            $.get(url, params)
                .done(function (data) {
                    setTimeout(function () {
                        APP.trigger(eventType, data);
                    }, constants.uiUpdateDelay);
                })
                .fail(function () {
                    setTimeout(function () {
                        APP.trigger(eventType + ":error");
                    }, constants.uiUpdateDelay);
                });
        };

    // Event handler: setup state initialized.
    APP.on("setup:stateInitialized", function () {
        doSearch("setup:initialSearchDataDownload");
    });

    // Event handler: search criteria update.
    APP.on("search:begin", function () {
        doSearch("search:dataDownload");
    });

}(
    this.APP,
    this.APP.constants,
    this.APP.state,
    this.APP.state.filters,
    this._,
    this.$
));