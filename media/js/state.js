// --------------------------------------------------------
// core.state.js - application state.
// --------------------------------------------------------
(function (APP, _) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Declare application state.
    APP.state = {
        // Set of filters.
        filters: _.indexBy([
            {
                data: {
                    all: [],
                    current: undefined
                },
                defaultKey: APP.utils.getURLParam('project', APP.defaults.project).toLowerCase(),
                key: "project",
                label: "Project / MIP Era",
                labelFormatter: 'upper',
                requiresMapping: true
            },
            {
                defaultKey: APP.utils.getURLParam('documentType', APP.defaults.documentType, true),
                key: "documentType",
                label: "Document Type",
                labelFormatter: undefined,
                requiresMapping: true
            },
            {
                defaultKey: "latest",
                key: "documentVersion",
                label: "Document Version",
                labelFormatter: undefined,
                requiresMapping: false
            },
            {
                defaultKey: undefined,
                key: "subProject",
                label: "Sub MIP",
                labelFormatter: 'upper',
                requiresMapping: true
            },
            {
                defaultKey: undefined,
                key: "institute",
                label: "Institute",
                labelFormatter: 'upper',
                requiresMapping: true
            },
            {
                defaultKey: undefined,
                key: "experiment",
                label: "Experiment",
                labelFormatter: undefined,
                requiresMapping: true
            },
            {
                defaultKey: undefined,
                key: "model",
                label: "Model",
                labelFormatter: undefined,
                requiresMapping: true
            }
        ], 'key'),

        // Returns data associated with a filter.
        getFilterData: function (f) {
            if (f === APP.state.filters.project) {
                return f.data;
            }
            return APP.state.filters.project.data.current[f.key];
        },

        // Returns data associated with a filter.
        hasColumn: function (col) {
            var dt;

            dt = APP.cv.getDocumentType();

            return _.contains(dt.search.columns, col);
        },

        getCurrentFilterData: function (f) {
            var pF;

            f = APP.state.filters[f];
            pF = APP.state.filters.project;
            if (f === pF) {
                return f.data.current;
            }
            return pF.data.current[f.key].current;
        },

        // Returns set of active filters.
        getActiveFilters: function () {
            return _.filter(APP.state.filters, function (f) {
                var dt;

                // True if not hideable.
                if (f === APP.state.filters.project ||
                    f === APP.state.filters.documentType ||
                    f === APP.state.filters.documentVersion) {
                    return true;
                }

                // True if within current document type search filters.
                dt = APP.cv.getDocumentType();
                if (dt.search.filters &&
                    _.contains(dt.search.filters, f.key)) {
                    return true;
                }

                return false;
            });
        },

        // Search data returned from server.
        searchData: {
            count: undefined,
            results: undefined,
            total: undefined,
        },

        // Paging related state.
        paging: {
            current: undefined,
            count: 0,
            pages: [],
            pageSize: 25,
            pageSizeOptions: [25, 50, 100]
        }
    };

    // Initialise filter defaults from url parameters.
    var pF = APP.state.filters.project,
        spF = APP.state.filters.subProject;
    if (pF.defaultKey.split(":").length === 2) {
        spF.defaultKey = pF.defaultKey.split(":")[1].toLowerCase();
        pF.defaultKey = pF.defaultKey.split(":")[0].toLowerCase();
    }

}(
    this.APP,
    this._
));