// --------------------------------------------------------
// state.manager.js - Manages application state updates.
// --------------------------------------------------------
(function (APP, _) {

    // ECMAScript 5 Strict Mode
    "use strict";

    var getFilterCurrentItem = function (f, collection) {
        var result;

        if (f.defaultKey) {
            result = _.find(collection, function (i) {
                return i.key === f.defaultKey ||
                       i.shortKey === f.defaultKey;
            });
        }

        return result || collection[0];
    };

    // Event handler: page setup data parsed.
    APP.on("setup:setupDataParsed", function (data) {
        var pF;

        // Cache cv data.
        _.defaults(APP.cv, data.cv);

        // Initialise filter data.
        pF = APP.state.filters.project;
        pF.data.all = data.project;
        pF.data.current = getFilterCurrentItem(pF, data.project);
        _.each(_.values(APP.state.filters), function (f) {
            if (f === pF) return;
            _.each(data.project, function (p) {
                p[f.key] = {
                    all: _.filter(data[f.key], function (i) {
                        return i.project === "*" || i.project === p.key;
                    })
                };
                p[f.key].current = getFilterCurrentItem(f, p[f.key].all);
            });
        });

        // Fire event.
        APP.trigger("setup:stateInitialized");
    });

}(
    this.APP,
    this._
));
