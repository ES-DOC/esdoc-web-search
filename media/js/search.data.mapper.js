(function (APP) {
    // ECMAScript 5 Strict Mode
    "use strict";

    // Returns a search result item.
    APP.mapSearchItem = function (i) {
        return {
            experiment: i[0],
            institute: i[1],
            longName: i[2],
            model: i[3],
            name: i[4],
            canonicalName: i[5],
            uid: i[6],
            version: i[7],
            alternativeName: i[8]
        };
    };

}(
    this.APP
));
