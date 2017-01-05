(function (APP, state, _) {

    // ECMAScript 5 Strict Mode
    "use strict";

    var parseResults = function (data) {
            data.results = _.map(data.results, APP.mapSearchItem);
        },

        // Parses document sort key.
        parseSortKey = function (data) {
            _.each(data.results, function (row) {
                row._sortKey = (row.institute + row.canonicalName).toLowerCase();
            });
            data.results = _.sortBy(data.results, '_sortKey');
        },

        // Set of parsers to execute.
        parsers = [
            parseResults,
            parseSortKey
        ],

        // Parses data returned from search API.
        doParse = function (data) {
            _.each(parsers, function (parser) {
                data = parser(data) || data;
            });
            return data;
        };

    // Setup data parser.
    APP.on("setup:initialSearchDataDownload", function (data) {
        APP.trigger("setup:initialSearchDataParsed", doParse(data));
    });

    // Setup data parser.
    APP.on("search:dataDownload", function (data) {
        APP.trigger("search:dataParsed", doParse(data));
    });

}(
    this.APP,
    this.APP.state,
    this._
));
