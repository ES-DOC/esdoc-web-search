// --------------------------------------------------------
// state.manager.js - Manages application state updates.
// --------------------------------------------------------
(function (APP, _) {

    // ECMAScript 5 Strict Mode
    "use strict";

    var // Update page state after search web-service response.
        updateSearchState = function (data) {
            // Cache.
            APP.state.searchData = data;

            // Initialise paging.
            APP.setPagination();
        };

    // Event handler: initial search completed.
    APP.on("setup:initialSearchDataParsed", function (data) {
        // Update page state.
        updateSearchState(data);

        // Fire events.
        APP.trigger("setup:complete");
    });

    // Event handler: search completed.
    APP.on("search:dataParsed", function (data) {
        // Update page state.
        updateSearchState(data);

        // Fire events.
        APP.trigger('state:pageUpdate');
        APP.trigger('search:complete');
    });

    APP.on("filter:update", function (filterType, filterKey) {
        var dtF, pF, f, collection;

        // Set filters.
        dtF = APP.state.filters.documentType;
        pF = APP.state.filters.project;
        f = APP.state.filters[filterType];

        // Set collection.
        if (f === pF) {
            collection = f.data;
        } else {
            collection = pF.data.current[f.key];
        }

        // Update currently selected item.
        collection.current = _.find(collection.all, function (i) {
            return i.key === filterKey;
        });

        // Fire events.
        if (f === pF || f === dtF) {
            APP.trigger("filter:refresh");
        }
        APP.trigger("search:begin");
    });

}(
    this.APP,
    this._
));
