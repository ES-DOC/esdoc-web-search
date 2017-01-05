(function (APP, state, _) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Setup data parser.
    APP.on("setup:setupDataDownload", function (data) {
        // Parse CV collections.
        data.cv.documentTypes = _.indexBy(data.cv.documentTypes, function (i) {
            return i.key.toLowerCase();
        });

        // Parse filter data.
        _.each(APP.state.filters, function (f) {
            // Map.
            if (f.requiresMapping) {
                data[f.key] = _.map(data[f.key], function (i) {
                    return {
                        "key": i,
                        "label": i
                    };
                });
            }

            // Parse.
            _.each(data[f.key], function (i) {
                if (i.key.split(":").length === 2) {
                    i.label = i.label.split(":")[1];
                    i.project = i.key.split(":")[0];
                    i.shortKey = i.key.split(":")[1];
                } else {
                    i.project = "*";
                    i.shortKey = i.key;
                }
                if (f.labelFormatter === 'upper') {
                    i.label = i.label.toUpperCase();
                }
                if (f.key === "documentType") {
                    i.cimKey = i.shortKey.toLowerCase();
                }
            });

            // Set global filter option.
            if (f === APP.state.filters.experiment ||
                f === APP.state.filters.institute ||
                f === APP.state.filters.model ||
                f === APP.state.filters.subProject) {
                data[f.key].unshift({
                    key: "*",
                    label: "*",
                    project: "*",
                    sortOrdinal: -1
                });
            }

            // Sort.
            data[f.key] = _.sortBy(data[f.key], function (i) {
                return i.sortOrdinal || i.key;
            });
        });

        // Exclude document types that are not search targets.
        data.documentType = _.filter(data.documentType, function (dt) {
            return _.has(data.cv.documentTypes, dt.cimKey) &&
                   data.cv.documentTypes[dt.cimKey].search;
        });

        // Extend document types.
        _.each(data.documentType, function (dt) {
            dt.label = data.cv.documentTypes[dt.cimKey].label;
            dt.customSearchFilters = data.cv.documentTypes[dt.cimKey].customSearchFilters;
        });

        // Fire event.
        APP.trigger("setup:setupDataParsed", data);
    });

}(
    this.APP,
    this.APP.state,
    this._
));
